const API_KEY = "YOUR_API_KEY_HERE";
let currentUnit = "metric";

/* ---------------- Ambient sound ---------------- */
const ambientSounds = {
  rain: new Audio("sounds/rain.wav"),
  fog: new Audio("sounds/fog.mp3"),
  wind: new Audio("sounds/wind.wav"),
  thunder: new Audio("sounds/thunder.wav"),
  snow: new Audio("sounds/snow.wav"),
  birds: new Audio("sounds/birds.wav"),
};
let activeSound = null;

/* --------------- Request & state --------------- */
// Tracks which request is the latest to prevent older responses
let currentRequestId = 0;

// Store last search to preserve geolocation or city input on unit toggle
let lastSearch = {
  type: null,
  lat: null,
  lon: null,
  city: null,
};

function renderMessage(msg) {
  document.getElementById("weatherResult").innerHTML = `<p>${msg}</p>`;
}

/* -------------- Drag-to-scroll utility -------------- */
function enableDragScroll(el) {
  let isDown = false, startX, scrollLeft;
  let velX = 0, lastX = 0, lastTime = 0, animId = null;

  el.addEventListener("mousedown", e => {
    isDown = true;
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    el.classList.add("dragging");
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
    lastX = e.pageX;
    lastTime = Date.now();
    velX = 0;
  });

  function stopDrag() {
    if (!isDown) return;
    isDown = false;
    el.classList.remove("dragging");
    // Momentum glide
    const glide = () => {
      if (Math.abs(velX) < 0.5) { animId = null; return; }
      el.scrollLeft -= velX * 16;
      velX *= 0.95;
      animId = requestAnimationFrame(glide);
    };
    animId = requestAnimationFrame(glide);
  }

  el.addEventListener("mouseleave", stopDrag);
  el.addEventListener("mouseup", stopDrag);

  el.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX);
    // Track velocity
    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      velX = (e.pageX - lastX) / dt;
      lastX = e.pageX;
      lastTime = now;
    }
  });
}

/* ----------------- Ambient audio ---------------- */
function playAmbient(weatherDesc, isNight) {
  try {
    if (activeSound) {
      activeSound.pause();
      activeSound.currentTime = 0;
    }
    const desc = String(weatherDesc || "").toLowerCase();

    if (desc.includes("rain") || desc.includes("shower")) activeSound = ambientSounds.rain;
    else if (desc.includes("mist") || desc.includes("fog")) activeSound = ambientSounds.fog;
    else if (desc.includes("cloud") || desc.includes("wind")) activeSound = ambientSounds.wind;
    else if (desc.includes("thunder")) activeSound = ambientSounds.thunder;
    else if (desc.includes("snow")) activeSound = ambientSounds.snow;
    else if (desc.includes("clear") && !isNight) activeSound = ambientSounds.birds;
    else activeSound = null;

    if (activeSound) {
      activeSound.loop = true;
      // Avoid unhandled promise rejection if autoplay is blocked
      activeSound.play().catch(() => {});
    }
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
}

/* ---------------- Background & theme ---------------- */
function setBackground(weatherDesc, isNight) {
  const body = document.body;
  const desc = String(weatherDesc || "").toLowerCase();
  let bgGradient = "", textColor = isNight ? "white" : "black";

  if (desc.includes("rain") || desc.includes("shower")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #141e30, #243b55)"
      : "linear-gradient(to right, #5b7e9e, #8fa4bf)";
    textColor = "white";
  } else if (desc.includes("mist") || desc.includes("fog")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #3a3f4b, #5c6370)"
      : "linear-gradient(to right, #757f9a, #d7dde8)";
  } else if (desc.includes("thunder")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #0a0a0f, #1a1a2e)"
      : "linear-gradient(to right, #2d2d37, #4a4a5a)";
    textColor = "white";
  } else if (desc.includes("cloud")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #2c3e50, #4a5568)"
      : "linear-gradient(to right, #78828c, #a0aab4)";
    textColor = isNight ? "white" : "black";
  } else if (desc.includes("wind")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #2c3e50, #34495e)"
      : "linear-gradient(to right, #b6bec9, #6d7176)";
  } else if (desc.includes("snow")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #2c3e6b, #4a5a80)"
      : "linear-gradient(to right, #b4c8e6, #6482aa)";
  } else if (desc.includes("clear")) {
    bgGradient = isNight
      ? "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
      : "linear-gradient(to right, #87ceeb, #ffdf80)";
  } else {
    bgGradient = isNight
      ? "linear-gradient(to right, #141e30, #243b55)"
      : "linear-gradient(to right, #4facfe, #00f2fe)";
  }

  body.style.background = bgGradient;
  body.style.color = textColor;
  document.getElementById("weatherResult").style.color = textColor;
}

/* ----------------- Weather effects ---------------- */
function createEffects(weatherDesc, isNight) {
  const container = document.querySelector(".effects-container");
  container.innerHTML = "";
  const desc = String(weatherDesc || "").toLowerCase();

  // Rain
  if (desc.includes("rain") || desc.includes("shower")) {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      const depth = 0.5 + Math.random();
      drop.style.width = 2 * depth + "px";
      drop.style.height = 15 * depth + "px";
      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = (0.5 + Math.random() * 0.5) / depth + "s";
      container.appendChild(drop);
    }
  }

  // Snow
  if (desc.includes("snow")) {
    for (let i = 0; i < 50; i++) {
      const flake = document.createElement("div");
      flake.className = "snowflake";
      const size = 4 + Math.random() * 6;
      flake.style.width = flake.style.height = size + "px";
      flake.style.left = Math.random() * 100 + "vw";
      flake.style.animationDuration = (5 + Math.random() * 5) + "s";
      flake.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(flake);
    }
  }

  // Clouds
  if (desc.includes("cloud") || desc.includes("thunder")) {
    const cloudCount = desc.includes("thunder") ? 5 : 3;
    for (let i = 0; i < cloudCount; i++) {
      const cloud = document.createElement("div");
      cloud.className = "cloud";
      cloud.style.top = Math.random() * 40 + "vh";
      cloud.style.width = 100 + Math.random() * 100 + "px";
      cloud.style.height = 50 + Math.random() * 30 + "px";
      cloud.style.animationDuration = (20 + Math.random() * 20) + "s";
      cloud.style.animationDelay = Math.random() * 10 + "s";
      container.appendChild(cloud);
    }
  }

  if (desc.includes("thunder")) {
    const thunder = document.createElement("div");
    thunder.className = "thunder";
    container.appendChild(thunder);
  }

  // Clear
  if (desc.includes("clear")) {
    if (isNight) {
      // Stars
      for (let i = 0; i < 60; i++) {
        const star = document.createElement("div");
        star.className = "star";
        const size = 1 + Math.random() * 3;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 60 + "vh";
        star.style.animationDuration = (2 + Math.random() * 3) + "s";
        star.style.animationDelay = Math.random() * 3 + "s";
        container.appendChild(star);
      }
      // Moon
      const moon = document.createElement("div");
      moon.className = "moon";
      moon.style.top = "8vh";
      moon.style.left = "auto";
      moon.style.right = "12vw";
      moon.style.width = "80px";
      moon.style.height = "80px";
      container.appendChild(moon);
    } else {
      // Sun shafts
      for (let i = 0; i < 5; i++) {
        const shaft = document.createElement("div");
        shaft.className = "sun-shaft";
        shaft.style.left = 15 + i * 15 + "%";
        shaft.style.width = 80 + Math.random() * 40 + "px";
        shaft.style.animationDelay = Math.random() * 3 + "s";
        shaft.style.opacity = 0.3 + Math.random() * 0.4;
        shaft.style.transform = `translateX(-50%) rotate(${Math.random() * 6 - 3}deg)`;
        container.appendChild(shaft);
      }
    }
  }

  playAmbient(desc, isNight);
}

/* ----------------- 5-day forecast ----------------- */
async function getForecast(lat, lon, reqId) {
  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
    url.search = new URLSearchParams({ lat, lon, appid: API_KEY, units: currentUnit });
    const resp = await fetch(url);
    const data = await resp.json();

    // Bail if this is an outdated response
    if (reqId !== currentRequestId) return;

    if (!resp.ok || !data || !Array.isArray(data.list)) return;

    const forecastContainer = document.createElement("div");
    forecastContainer.className = "forecast-container";

    // One per day (around 12:00)
    const daily = data.list.filter(item => String(item.dt_txt).includes("12:00:00")).slice(0, 5);
    daily.forEach(day => {
      const card = document.createElement("div");
      card.className = "forecast-card";
      card.innerHTML = `
        <p>${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month:'short', day:'numeric' })}</p>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon">
        <p>${Math.round(day.main.temp)}°${currentUnit === "metric" ? "C" : "F"}</p>
      `;
      forecastContainer.appendChild(card);
    });

    const result = document.getElementById("weatherResult");
    // If another request updated the card meanwhile, don't append
    if (reqId === currentRequestId) {
      result.appendChild(forecastContainer);
      enableDragScroll(forecastContainer);
    }
  } catch (err) {
    console.error("Forecast error:", err);
  }
}

/* ----------------- hourly forecast (3-hour steps) ----------------- */
async function getHourlyForecast(lat, lon, reqId) {
    try {
        const url = new URL("https://api.openweathermap.org/data/2.5/forecast");
        url.search = new URLSearchParams({
            lat,
            lon,
            appid: API_KEY,
            units: currentUnit
        });

        const resp = await fetch(url);
        const data = await resp.json();

        if (reqId !== currentRequestId) return; // ignore outdated requests
        if (!resp.ok || !data.list) return;

        // Remove old container and title if they exist
        const oldTitle = document.querySelector(".hourly-title");
        if (oldTitle) oldTitle.remove();
        let hourlyContainer = document.querySelector(".hourly-container");
        if (hourlyContainer) {
            hourlyContainer.remove();
        }

        // Create new container
        hourlyContainer = document.createElement("div");
        hourlyContainer.className = "hourly-container";
        document.getElementById("weatherResult").appendChild(hourlyContainer);

        // Title
        const title = document.createElement("h3");
        title.className = "hourly-title";
        title.textContent = "Hourly Forecast";
        title.style.width = "100%";
        title.style.textAlign = "center";
        title.style.marginBottom = "10px";

        // Insert title BEFORE the scrollable container
        hourlyContainer.parentNode.insertBefore(title, hourlyContainer);

        // Next 12 hours (first 12 x 3-hour steps)
        const next12Hours = data.list.slice(0, 12);
        next12Hours.forEach(hourData => {
            const dt = new Date(hourData.dt * 1000);
            const time = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const temp = Math.round(hourData.main.temp);
            const icon = hourData.weather[0].icon;
            const desc = hourData.weather[0].description;

            const card = document.createElement("div");
            card.className = "hourly-card";
            card.innerHTML = `
                <p class="hour">${time}</p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
                <p class="temp">${temp}°${currentUnit === "metric" ? "C" : "F"}</p>
            `;
            hourlyContainer.appendChild(card);
        });

        enableDragScroll(hourlyContainer);

        // Update charts here
        const chartData = next12Hours.map(h => ({
            dt: h.dt,
            temp: h.main.temp,
            wind_speed: h.wind.speed,
            rain: h.rain ? h.rain["3h"] : 0
        }));
        updateCharts(chartData);

    } catch (err) {
        console.error("Hourly forecast error:", err);
    }
}

/* --------- Core weather fetch by coordinates -------- */
async function getWeatherFromCoords(lat, lon, placeTitle, reqId) {
  try {
    const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
    weatherUrl.search = new URLSearchParams({ lat, lon, appid: API_KEY, units: currentUnit });
    const wResp = await fetch(weatherUrl);
    const data = await wResp.json();

    // Bail if outdated
    if (reqId !== currentRequestId) return;

    if (!wResp.ok || !data || !data.main || !data.weather) {
      renderMessage(`Weather error (${wResp.status || "unknown"}).`);
      return;
    }

    const desc = data.weather?.[0]?.description || "—";
    const isNight = (data.weather?.[0]?.icon || "").endsWith("n");

    setBackground(desc, isNight);
    createEffects(desc, isNight);

    // Only update the DOM if this is still the latest request
    if (reqId === currentRequestId) {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${placeTitle}</h2>
        <p style="text-transform: capitalize;">${desc}</p>
        <div class="info-line"><span class="icon temp-icon">🌡️</span> Temperature: ${data.main.temp}°${currentUnit === "metric" ? "C" : "F"}</div>
        <div class="info-line"><span class="icon feels-icon">🤗</span> Feels like: ${data.main.feels_like}°${currentUnit === "metric" ? "C" : "F"}</div>
        <div class="info-line"><span class="icon humidity-icon">💧</span> Humidity: ${data.main.humidity}%</div>
        <div class="info-line"><span class="icon wind-icon">💨</span> Wind: ${data.wind.speed} ${currentUnit === "metric" ? "m/s" : "mph"}</div>
        <img alt="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      `;
    }

    await getForecast(lat, lon, reqId);
    await getHourlyForecast(lat, lon, reqId);

  } catch (err) {
    console.error("Weather fetch error:", err);
    if (reqId === currentRequestId) {
      renderMessage("Network error. Check your internet connection and try again.");
    }
  }
}

/* ------------------ Charts setup ------------------ */
let tempChart, windChart, rainChart;

// Function to initialize all charts
function initCharts() {
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    const windCtx = document.getElementById('windChart').getContext('2d');
    const rainCtx = document.getElementById('rainChart').getContext('2d');

    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: { labels: [], datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
            fill: true
        }]},
        options: { responsive: true }
    });

    windChart = new Chart(windCtx, {
        type: 'line',
        data: { labels: [], datasets: [{
            label: 'Wind Speed (m/s)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4,
            fill: true
        }]},
        options: { responsive: true }
    });

    rainChart = new Chart(rainCtx, {
        type: 'line',
        data: { labels: [], datasets: [{
            label: 'Rain Volume (mm)',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
            fill: true
        }]},
        options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { callback: function(value) { return value + ' mm'; } } } } }
    });
}

// Function to update charts with forecast data
function updateCharts(hourlyData) {
    const labels = hourlyData.map(h => new Date(h.dt * 1000).getHours() + ":00");

    const temps = hourlyData.map(h => h.temp);
    const winds = hourlyData.map(h => h.wind_speed);
    const rains = hourlyData.map(h => h.rain);

    // Update datasets and labels for current unit
    tempChart.data.labels = labels;
    tempChart.data.datasets[0].data = temps;
    tempChart.data.datasets[0].label = `Temperature (°${currentUnit === "metric" ? "C" : "F"})`;
    tempChart.update();

    windChart.data.labels = labels;
    windChart.data.datasets[0].data = winds;
    windChart.data.datasets[0].label = `Wind Speed (${currentUnit === "metric" ? "m/s" : "mph"})`;
    windChart.update();

    rainChart.data.labels = labels;
    rainChart.data.datasets[0].data = rains;
    rainChart.update();
}

window.addEventListener('load', initCharts);

/* ------------------- Main function ------------------ */
async function getWeather(useGeo = false) {
  const reqId = ++currentRequestId;            // mark this call as the latest
  const cityInput = document.getElementById("cityInput");
  const typedCity = cityInput.value.trim();
  renderMessage("Loading…");

  try {
    let lat, lon, placeTitle;

    if (useGeo) {
      // Force a fresh geolocation read every time Use My Location is pressed
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 0,
        })
      );
      // If a newer request started while we waited, stop
      if (reqId !== currentRequestId) return;

      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      placeTitle = "Your Location";
      cityInput.value = "";
      cityInput.blur();

      lastSearch = { type: "geo", lat, lon, city: null };

    } else if (typedCity) {
      const geoUrl = new URL("https://api.openweathermap.org/geo/1.0/direct");
      geoUrl.search = new URLSearchParams({ q: typedCity, limit: 1, appid: API_KEY });
      const geoResp = await fetch(geoUrl);
      const places = await geoResp.json();

      if (reqId !== currentRequestId) return;

      if (!geoResp.ok || !Array.isArray(places) || places.length === 0) {
        renderMessage("City not found.");
        return;
      }

      // Avoid implicit globals: destructure safely
      const { lat: plat, lon: plon, name, country, state } = places[0];
      lat = plat;
      lon = plon;
      placeTitle = [name, state, country].filter(Boolean).join(", ");

      lastSearch = { type: "city", lat, lon, city: typedCity };

    } else if (lastSearch.type) {
      // Re-run the last successful query (e.g., unit toggle)
      lat = lastSearch.lat;
      lon = lastSearch.lon;
      placeTitle = lastSearch.type === "geo" ? "Your Location" : lastSearch.city;

    } else {
      renderMessage("Please enter a city name or use your location.");
      return;
    }

    await getWeatherFromCoords(lat, lon, placeTitle, reqId);

  } catch (err) {
    console.error("Main getWeather error:", err);
    if (useGeo) {
      renderMessage("Unable to get your location. Please allow location access.");
    } else {
      renderMessage("Something went wrong. Try again.");
    }
  }
}

/* ------------------ Unit toggle ------------------ */
function toggleUnit() {
  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  document.getElementById("unitToggleBtn").innerText =
    currentUnit === "metric" ? "Switch to °F" : "Switch to °C";

  if (lastSearch.lat != null && lastSearch.lon != null) {
    // Respect the original source: geo -> call with true to force fresh coords,
    // city -> call with false to reuse city coords.
    getWeather(lastSearch.type === "geo");
  }
}

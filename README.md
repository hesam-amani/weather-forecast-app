![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg)

# 🌦️ Weather Forecast App

A beautiful, fully client-side weather application with **live visual effects**, **ambient sounds**, and **interactive charts** — all powered by the [OpenWeatherMap API](https://openweathermap.org/api).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **City Search** | Look up current weather by city name |
| 📍 **Geolocation** | One-click weather for your current location |
| 🌡️ **Unit Toggle** | Switch between Celsius (°C) and Fahrenheit (°F) on the fly |
| 📅 **5-Day Forecast** | Daily forecast cards with icons and temperatures |
| ⏱️ **Hourly Forecast** | Scrollable 36-hour forecast in 3-hour steps |
| 📊 **Live Charts** | Temperature, wind speed, and rain volume charts (Chart.js) |
| 🎨 **Dynamic Backgrounds** | Gradient backgrounds that adapt to the current weather |
| 🌧️ **Weather Effects** | Animated rain drops, snowflakes, clouds, thunderstorm flashes, and sun shafts |
| 🔊 **Ambient Sounds** | Weather-matched audio (rain, wind, thunder, birds, etc.) with mute control |
| 🌙 **Day / Night Mode** | Automatic theme shift based on local time |

---

## 🖼️ Preview

> Open `index.html` in any modern browser — no build step required.

---

## 🛠️ Tech Stack

- **HTML5** / **CSS3** / **Vanilla JavaScript** — zero frameworks
- **[Chart.js](https://www.chartjs.org/)** (CDN) — responsive, animated charts
- **[OpenWeatherMap API](https://openweathermap.org/api)** — current weather, geocoding, and 5-day/3-hour forecasts

---

## 📁 Project Structure

```
weather-forecast-app/
├── index.html      # Main page & markup
├── script.js       # All application logic (API calls, effects, charts)
├── style.css       # Styling, animations & weather effects
├── sounds/         # Ambient audio files (rain, wind, thunder, etc.)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An internet connection (for the API and Chart.js CDN)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Open `index.html` in your browser** — that's it!  
   No installs, no build tools, no dependencies to manage.

### API Key

The app uses an OpenWeatherMap API key supplied at deployment time by GitHub Actions. The key is stored as a GitHub Actions repository secret and is never committed to the repository.

---

## 🎮 Usage

1. **Search by city** — Type a city name and click **🔍 Get Weather**.
2. **Use your location** — Click **📍 Use My Location** (browser will ask for permission).
3. **Toggle units** — Click **🔃 Switch to °F / °C** to convert temperatures and wind speed.
4. **Mute / Unmute** — Click **🔊 Mute** to toggle ambient weather sounds.
5. Scroll down to view **hourly forecast cards** and **weather charts**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Chart.js](https://chartjs.org/) for the charting library

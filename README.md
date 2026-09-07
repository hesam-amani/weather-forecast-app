# 🌦️ Weather Forecast App

[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-222?logo=github)](https://hesam-amani.github.io/weather-forecast-app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A client-side weather application with **live weather data**, **dynamic visual effects**, **ambient sounds**, **interactive charts**, and a **5-day forecast** — powered by the [OpenWeatherMap API](https://openweathermap.org/api).

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **City Search** | Look up current weather by city name |
| 📍 **Geolocation** | Get weather for your current location with browser permission |
| 🌡️ **Unit Toggle** | Switch between Celsius (°C) and Fahrenheit (°F) |
| 📅 **5-Day Forecast** | Daily forecast cards with weather icons and temperatures |
| ⏱️ **Hourly Forecast** | Scrollable 36-hour forecast in 3-hour steps |
| 📊 **Interactive Charts** | Temperature, wind speed, and rain-volume charts using Chart.js |
| 🎨 **Dynamic Backgrounds** | Background gradients adapt to the current conditions and time of day |
| 🌧️ **Weather Effects** | Animated rain, snow, clouds, thunderstorm flashes, stars, moon, and sun shafts |
| 🔊 **Ambient Sounds** | Weather-matched sounds with mute control |
| 🌙 **Day / Night** | Theme and effects adapt to the weather service's day/night icon |

## 🌐 Live Demo

**[Open the Weather Forecast App](https://hesam-amani.github.io/weather-forecast-app/)**

## 🛠️ Tech Stack

- **HTML5** / **CSS3** / **Vanilla JavaScript** — no framework or build system
- **[Chart.js](https://www.chartjs.org/)** — responsive weather charts loaded from jsDelivr
- **[OpenWeatherMap API](https://openweathermap.org/api)** — current weather, geocoding, and 5-day/3-hour forecast data
- **GitHub Actions + GitHub Pages** — automatic deployment from `main`

## 📁 Project Structure

```text
weather-forecast-app/
├── .github/
│   ├── ISSUE_TEMPLATE/          # Bug and feature request templates
│   ├── pull_request_template.md # Pull request checklist
│   └── workflows/
│       └── deploy-pages.yml     # GitHub Pages deployment + runtime config
├── sounds/                      # Ambient weather audio assets
├── index.html                   # Main page and UI markup
├── script.js                    # Weather API, state, effects, audio, and charts
├── style.css                    # Layout, animations, and responsive styling
├── config.example.js            # Local API-key configuration template
├── .gitignore
├── CODE_OF_CONDUCT.md
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- An internet connection
- An OpenWeatherMap API key for local development

### Run Locally

1. **Clone the repository**
   ```bash
   git clone git@github.com:hesam-amani/weather-forecast-app.git
   cd weather-forecast-app
   ```

2. **Create your local runtime configuration**
   ```bash
   cp config.example.js config.js
   ```

3. **Edit `config.js`** and replace `YOUR_OPENWEATHER_API_KEY` with your own OpenWeatherMap API key.

4. **Serve the directory locally** using a simple local web server. For example, with Python:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

> Opening `index.html` directly may work for some static assets, but using a local HTTP server is the recommended setup because the app uses browser APIs such as geolocation and fetch-based API requests.

### API Key & Deployment

The repository does **not** contain a committed production API key. On GitHub Pages deployments, GitHub Actions reads the `WEATHER_KEY` repository secret and generates `config.js` during the build before publishing the site.

Because this is a browser application, the API key is ultimately delivered to the browser and **cannot be treated as a true secret**. The deployment workflow keeps it out of Git history, while the key itself should be configured with appropriate OpenWeatherMap usage limits/restrictions where available.

## 🎮 Usage

1. **Search by city** — Enter a city and select **Get Weather**.
2. **Use your location** — Select **Use My Location** and allow browser location access.
3. **Toggle units** — Switch between °C and °F after a weather result is available.
4. **Mute sounds** — Toggle ambient weather audio with the mute button.
5. **Explore the forecast** — Scroll through the daily and hourly forecasts and view the charts.

## 🤝 Contributing

Issues and pull requests are welcome. Please use the included issue and pull request templates when contributing.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for weather data and APIs
- [Chart.js](https://www.chartjs.org/) for interactive charts
- [Contributor Covenant](https://www.contributor-covenant.org/) for the Code of Conduct template

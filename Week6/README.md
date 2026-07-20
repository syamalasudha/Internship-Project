# 🌦 WeatherOS - Smart Weather Dashboard

WeatherOS is a modern, responsive weather dashboard application that provides real-time weather information and 5-day forecasts using the OpenWeatherMap API.

It features a futuristic glassmorphism interface, animated background, city search, location-based weather detection, and Local Storage support for saving user preferences.



# 🚀 Features

## 🌍 Real-Time Weather Data

- Fetches live weather information using OpenWeatherMap API
- Displays current temperature
- Shows weather condition and icon
- Displays humidity
- Shows wind speed
- Displays atmospheric pressure
- Shows visibility
- Displays sunrise and sunset timings



## 📅 5-Day Forecast

The application provides a detailed forecast including:

- Day name
- Weather icon
- Temperature
- Weather description



## 🔎 City Search

Users can:

- Search weather for any city
- Get instant weather updates
- Use Enter key for searching



## 📍 Current Location Weather

Using the Geolocation API:

- Detects user's current location
- Fetches weather using latitude and longitude
- Displays location-based weather information

## ⭐ Favorite Cities

Users can:

- Save frequently searched cities
- Quickly access favorite locations
- Store favorite cities using Local Storage



## 🕒 Recent Search History

The application stores:

- Recently searched cities
- Last searched city

All preferences are stored locally using browser Local Storage.



# 🎨 UI Design

WeatherOS provides a modern dashboard experience with:

- Glassmorphism design
- Animated gradient background
- Floating weather orb
- Smooth animations
- Interactive cards
- Responsive layout

Dynamic themes are applied based on weather:

- ☀ Clear Weather
- ☁ Cloudy Weather
- 🌧 Rain Weather
- ❄ Snow Weather
- ⛈ Thunderstorm Weather



# 🛠 Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript ES6+

## API

- OpenWeatherMap REST API

## Browser Features

- Fetch API
- Async/Await
- Local Storage API
- Geolocation API



# 📂 Project Structure


WeatherOS
│
├── index.html
│
├── css
│   └── styles.css
│
├── js
│   ├── api.js
│   ├── app.js
│   └── storage.js
│
├── images
│
└── README.md


# ⚙️ Installation and Setup

## Step 1: Clone Repository


git clone your-repository-link


## Step 2: Open Project Folder


cd WeatherOS


## Step 3: Add API Key

Open:


js/api.js


javascript
const API_KEY = "YOUR_API_KEY";


with your OpenWeatherMap API key.

Example:

javascript
const API_KEY = "your_actual_api_key";


## Step 4: Run Application

Open:

index.html

in your browser.

For development, use VS Code Live Server.

---

# 🔑 OpenWeatherMap API Setup

Steps:

1. Create an account on OpenWeatherMap
2. Generate an API key
3. Add the key inside `api.js`
4. Run the application



# 🔄 Application Workflow


User searches a city

        ↓

JavaScript sends API request

        ↓

OpenWeatherMap returns JSON data

        ↓

Data is processed using JavaScript

        ↓

Weather information updates on UI

        ↓

User preferences are saved in Local Storage


# 🧠 Concepts Implemented

This project demonstrates:

- REST API integration
- Async/Await
- Promise handling
- JSON data processing
- DOM manipulation
- Event handling
- Local Storage management
- Geolocation API
- Responsive web design
- Error handling


# 📱 Responsive Design

WeatherOS supports:

- Desktop
- Laptop
- Tablet
- Mobile devices

The interface automatically adapts to different screen sizes.



# 📸 Screenshots

Add screenshots in:


screenshots/
│
├── dashboard.png
├── forecast.png
└── mobile-view.png




# 🌐 Deployment

The project can be deployed using:

- GitHub Pages
- Netlify
- Vercel



# 🔮 Future Enhancements

Future improvements:

- Dark/light mode toggle
- Hourly forecast
- Air quality monitoring
- Weather alerts
- Multiple language support
- Advanced weather animations



# 👨‍💻 Author

Syamala Sudha



# 📄 License

This project is created for educational and portfolio purposes.
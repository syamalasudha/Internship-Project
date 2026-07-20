const API_KEY = "847efdfe0092fcbcdb3c902bd28ea00f";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

async function fetchWeather(city) {

    const response = await fetch(

        `${WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

    );

    if (!response.ok) {

        throw new Error("City not found");

    }

    return await response.json();

}

async function fetchForecast(city) {

    const response = await fetch(

        `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

    );

    if (!response.ok) {

        throw new Error("Forecast not available");

    }

    return await response.json();

}

async function fetchWeatherByCoords(lat, lon) {

    const response = await fetch(

        `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    );

    if (!response.ok) {

        throw new Error("Unable to fetch current location");

    }

    return await response.json();

}

async function fetchForecastByCoords(lat, lon) {

    const response = await fetch(

        `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    );

    if (!response.ok) {

        throw new Error("Forecast not available");

    }

    return await response.json();

}

function getWeatherIcon(iconCode) {

    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

}

function formatTime(timestamp) {

    return new Date(timestamp * 1000).toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

function getFiveDayForecast(list) {

    const forecast = [];
    const usedDates = new Set();

    list.forEach(item => {

        const [date, time] = item.dt_txt.split(" ");

        if (time === "12:00:00" && !usedDates.has(date)) {

            usedDates.add(date);

            forecast.push({

                day: new Date(date).toLocaleDateString("en-US", {

                    weekday: "short"

                }),

                temperature: Math.round(item.main.temp),

                description: item.weather[0].description,

                icon: getWeatherIcon(item.weather[0].icon)

            });

        }

    });

    return forecast.slice(0, 5);

}
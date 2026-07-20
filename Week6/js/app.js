const loader = document.getElementById("loader");

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const addFavoriteBtn = document.getElementById("addFavorite");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const forecastContainer = document.getElementById("forecastContainer");
const errorMessage = document.getElementById("errorMessage");

let currentCity = "";

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.display = "none";

    }, 1200);

    renderFavorites();
    renderHistory();

    loadWeather(getLastCity());

});

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {

        showError("Please enter a city.");

        return;

    }

    loadWeather(city);

    cityInput.value = "";

});

cityInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

addFavoriteBtn.addEventListener("click", () => {

    if (!currentCity) return;

    saveFavorite(currentCity);

    renderFavorites();

});

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        showError("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async position => {

            try {

                const weather = await fetchWeatherByCoords(

                    position.coords.latitude,

                    position.coords.longitude

                );

                const forecast = await fetchForecastByCoords(

                    position.coords.latitude,

                    position.coords.longitude

                );

                currentCity = weather.name;

                saveLastCity(currentCity);

                saveHistory(currentCity);

                renderHistory();

                displayWeather(weather);

                displayForecast(

                    getFiveDayForecast(forecast.list)

                );

            }

            catch (error) {

                showError(error.message);

            }

        },

        () => {

            showError("Location permission denied.");

        }

    );

});

async function loadWeather(city) {

    try {

        errorMessage.textContent = "";

        const weather = await fetchWeather(city);

        const forecast = await fetchForecast(city);

        currentCity = weather.name;

        saveLastCity(currentCity);

        saveHistory(currentCity);

        renderHistory();

        displayWeather(weather);

        displayForecast(

            getFiveDayForecast(forecast.list)

        );

    }

    catch (error) {

        showError(error.message);

    }

}

function showError(message) {

    errorMessage.textContent = message;

    setTimeout(() => {

        errorMessage.textContent = "";

    }, 3000);

}
function displayWeather(weather) {

    cityName.textContent = weather.name;

    temperature.textContent =
        `${Math.round(weather.main.temp)}°C`;

    description.textContent =
        weather.weather[0].description;

    weatherIcon.src =
        getWeatherIcon(weather.weather[0].icon);

    weatherIcon.alt =
        weather.weather[0].description;

    humidity.textContent =
        `${weather.main.humidity}%`;

    wind.textContent =
        `${Math.round(weather.wind.speed * 3.6)} km/h`;

    pressure.textContent =
        `${weather.main.pressure} hPa`;

    visibility.textContent =
        `${(weather.visibility / 1000).toFixed(1)} km`;

    sunrise.textContent =
        formatTime(weather.sys.sunrise);

    sunset.textContent =
        formatTime(weather.sys.sunset);

    document.body.classList.remove(

        "theme-clear",

        "theme-clouds",

        "theme-rain",

        "theme-snow",

        "theme-thunderstorm"

    );

    const condition =
        weather.weather[0].main.toLowerCase();

    switch (condition) {

        case "clear":

            document.body.classList.add(
                "theme-clear"
            );

            break;

        case "clouds":

            document.body.classList.add(
                "theme-clouds"
            );

            break;

        case "rain":

        case "drizzle":

            document.body.classList.add(
                "theme-rain"
            );

            break;

        case "snow":

            document.body.classList.add(
                "theme-snow"
            );

            break;

        case "thunderstorm":

            document.body.classList.add(
                "theme-thunderstorm"
            );

            break;

    }

    cityName.classList.add("fade");
    temperature.classList.add("fade");
    description.classList.add("fade");

    setTimeout(() => {

        cityName.classList.remove("fade");
        temperature.classList.remove("fade");
        description.classList.remove("fade");

    }, 600);

}

function displayForecast(forecast) {

    forecastContainer.innerHTML = "";

    forecast.forEach(day => {

        const card = document.createElement("div");

        card.className = "forecast-card fade";

        card.innerHTML = `

            <h4>${day.day}</h4>

            <img
                src="${day.icon}"
                alt="${day.description}">

            <h2>${day.temperature}°</h2>

            <p>${day.description}</p>

        `;

        forecastContainer.appendChild(card);

    });

}
function refreshWeather() {

    if (currentCity) {

        loadWeather(currentCity);

    }

}

setInterval(() => {

    if (currentCity) {

        refreshWeather();

    }

}, 600000);

document.addEventListener("keydown", event => {

    if (event.ctrlKey && event.key.toLowerCase() === "l") {

        cityInput.focus();

        event.preventDefault();

    }

});

window.addEventListener("online", () => {

    showError("Internet connection restored.");

    refreshWeather();

});

window.addEventListener("offline", () => {

    showError("You are offline.");

});

window.addEventListener("beforeunload", () => {

    if (currentCity) {

        saveLastCity(currentCity);

    }

});

(function init() {

    renderFavorites();

    renderHistory();

})();
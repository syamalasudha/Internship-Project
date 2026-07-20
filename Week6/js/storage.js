const FAVORITES_KEY = "weatheros_favorites";
const HISTORY_KEY = "weatheros_history";
const LAST_CITY_KEY = "weatheros_last_city";

function getFavorites() {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
}

function saveFavorite(city) {
    if (!city) return;

    let favorites = getFavorites();

    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );
    }
}

function removeFavorite(city) {
    let favorites = getFavorites();

    favorites = favorites.filter(item => item !== city);

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

function renderFavorites() {

    const list = document.getElementById("favoriteList");

    list.innerHTML = "";

    const favorites = getFavorites();

    if (favorites.length === 0) {

        list.innerHTML = "<li>No favorite cities</li>";

        return;
    }

    favorites.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {

            if (typeof loadWeather === "function") {
                loadWeather(city);
            }

        });

        list.appendChild(li);

    });

}

function getHistory() {

    const data = localStorage.getItem(HISTORY_KEY);

    return data ? JSON.parse(data) : [];

}

function saveHistory(city) {

    if (!city) return;

    let history = getHistory();

    history = history.filter(item => item !== city);

    history.unshift(city);

    if (history.length > 8) {

        history.pop();

    }

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}

function clearHistory() {

    localStorage.removeItem(HISTORY_KEY);

    renderHistory();

}

function renderHistory() {

    const list = document.getElementById("historyList");

    list.innerHTML = "";

    const history = getHistory();

    if (history.length === 0) {

        list.innerHTML = "<li>No recent searches</li>";

        return;

    }

    history.forEach(city => {

        const li = document.createElement("li");

        li.textContent = city;

        li.addEventListener("click", () => {

            if (typeof loadWeather === "function") {
                loadWeather(city);
            }

        });

        list.appendChild(li);

    });

}

function saveLastCity(city) {

    if (!city) return;

    localStorage.setItem(
        LAST_CITY_KEY,
        city
    );

}

function getLastCity() {

    return localStorage.getItem(
        LAST_CITY_KEY
    ) || "Hyderabad";

}
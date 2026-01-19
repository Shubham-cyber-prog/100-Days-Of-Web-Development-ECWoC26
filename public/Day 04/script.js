// ================== DOM ELEMENTS ==================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const weatherContent = document.getElementById("weatherContent");

const currentTemp = document.getElementById("currentTemp");
const currentLocation = document.getElementById("currentLocation");
const currentDate = document.getElementById("currentDate");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const uvIndex = document.getElementById("uvIndex");
const visibility = document.getElementById("visibility");

const forecastContainer = document.getElementById("forecastContainer");
const suggestionsBox = document.getElementById("suggestions");

// ================== EVENTS ==================
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (!city) return;
    getCityCoordinates(city);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();
        if (!city) return;
        getCityCoordinates(city);
    }
});

searchInput.addEventListener("input", debounce((e) => fetchSuggestions(e.target.value), 400));
document.addEventListener("click", e => {
    if (!e.target.closest("#suggestions") && e.target !== searchInput) suggestionsBox.style.display = "none";
});

locationBtn.addEventListener("click", getCurrentLocation);

// ================== LOADING & ERROR ==================
function showLoading() {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    weatherContent.classList.add("hidden");
}
function hideLoading() { loading.classList.add("hidden"); }
function showError(msg = "City not found. Please try again.") {
    errorMessage.querySelector("p").textContent = msg;
    errorMessage.classList.remove("hidden");
    weatherContent.classList.add("hidden");
    hideLoading();
}

// ================== GEO & WEATHER ==================
async function getCityCoordinates(city) {
    showLoading();
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) throw new Error("City not found");

        const { latitude, longitude, name, country } = geoData.results[0];
        getWeather(latitude, longitude, name, country);
    } catch (err) {
        console.error(err);
        showError();
    }
}

async function getWeather(lat, lon, name, country) {
    showLoading();
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.current_weather || !data.daily) throw new Error("Incomplete data");

        // Current weather
        currentTemp.textContent = Math.round(data.current_weather.temperature) + "°";
        currentLocation.textContent = `${name}${country ? ', ' + country : ''}`;
        currentDate.textContent = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });

        const weather = getWeatherInfo(data.current_weather.weathercode);
        currentWeatherIcon.src = weather.icon;
        currentWeatherIcon.alt = weather.description;

        // 7-day forecast
        renderForecast(data.daily);

        hideLoading();
        weatherContent.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        // Save last city
        localStorage.setItem("lastCity", name);

    } catch (err) {
        console.error(err);
        showError("Error fetching weather data.");
    }
}


// ================== FORECAST ==================
function renderForecast(daily) {
    if (!daily.time || !daily.weathercode || !daily.temperature_2m_max || !daily.temperature_2m_min) return;

    forecastContainer.innerHTML = "";

    daily.time.forEach((dateStr, i) => {
        const dayName = new Date(dateStr).toLocaleDateString(undefined, { weekday: "short" });
        const weather = getWeatherInfo(daily.weathercode[i]);
        const max = Math.round(daily.temperature_2m_max[i]);
        const min = Math.round(daily.temperature_2m_min[i]);

        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="${weather.icon}" alt="${weather.description}">
            <div class="forecast-temp">${max}° / ${min}°</div>
        `;
        forecastContainer.appendChild(card);
    });
}


// ================== WEATHER CODES ==================
function getWeatherInfo(code) {
    const map = {
        0: { description: "Clear Sky", icon: "https://img.icons8.com/emoji/48/000000/sun-emoji.png" },
        1: { description: "Mainly Clear", icon: "https://img.icons8.com/emoji/48/000000/partly-sunny.png" },
        2: { description: "Partly Cloudy", icon: "https://img.icons8.com/emoji/48/000000/cloud-emoji.png" },
        3: { description: "Overcast", icon: "https://img.icons8.com/emoji/48/000000/cloud-emoji.png" },
        45: { description: "Fog", icon: "https://img.icons8.com/emoji/48/000000/fog.png" },
        48: { description: "Rime Fog", icon: "https://img.icons8.com/emoji/48/000000/fog.png" },
        51: { description: "Light Drizzle", icon: "https://img.icons8.com/emoji/48/000000/cloud-with-rain.png" },
        61: { description: "Rain", icon: "https://img.icons8.com/emoji/48/000000/cloud-with-rain.png" },
        71: { description: "Snow", icon: "https://img.icons8.com/emoji/48/000000/snowflake.png" },
        80: { description: "Rain Showers", icon: "https://img.icons8.com/emoji/48/000000/cloud-with-rain.png" },
        95: { description: "Thunderstorm", icon: "https://img.icons8.com/emoji/48/000000/cloud-with-lightning-and-rain.png" },
    };
    return map[code] || { description: "Unknown", icon: "https://img.icons8.com/emoji/48/000000/question-mark.png" };
}

// ================== AUTOCOMPLETE ==================
async function fetchSuggestions(query) {
    if (query.length < 2) { suggestionsBox.style.display = "none"; return; }
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.results) { suggestionsBox.style.display = "none"; return; }

        suggestionsBox.innerHTML = "";
        data.results.forEach(city => {
            const div = document.createElement("div");
            div.textContent = `${city.name}, ${city.country}`;
            div.onclick = () => { searchInput.value = city.name; suggestionsBox.style.display = "none"; getCityCoordinates(city.name); };
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = "block";
    } catch (err) {
        console.error(err);
        suggestionsBox.style.display = "none";
    }
}

function debounce(fn, delay=400) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }

// ================== GEOLOCATION ==================
function getCurrentLocation() {
    if (!navigator.geolocation) { showError("Geolocation not supported"); return; }
    showLoading();
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        getWeather(latitude, longitude, "Your Location", "");
    }, err => showError("Unable to get location"));
}

// ================== AUTOLOAD LAST CITY ==================
window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) getCityCoordinates(lastCity);
});

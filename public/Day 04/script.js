// ===================== ELEMENTS =====================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const weatherContent = document.getElementById("weatherContent");

const currentTemp = document.getElementById("currentTemp");
const currentLocation = document.getElementById("currentLocation");
const currentDate = document.getElementById("currentDate");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");

const uvIndex = document.getElementById("uvIndex");
const visibility = document.getElementById("visibility");

// ===================== EVENTS =====================
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") handleSearch();
});

// ===================== HANDLERS =====================
async function handleSearch() {
    const city = searchInput.value.trim();
    if (!city) return;
    showLoading();
    await getCityCoordinates(city);
}

// ===================== API LOGIC =====================
async function getCityCoordinates(city) {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.results || !data.results.length) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = data.results[0];
        await getWeather(latitude, longitude, name, country);
    } catch (err) {
        showError("City not found. Please try again.");
    }
}

async function getWeather(lat, lon, city, country) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=uv_index,visibility`;
        const res = await fetch(url);
        const data = await res.json();

        const hourIndex = data.hourly.time.indexOf(
            data.current_weather.time
        );

        currentTemp.textContent = `${Math.round(data.current_weather.temperature)}°`;
        currentLocation.textContent = `${city}, ${country}`;
        currentDate.textContent = new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric"
        });

        uvIndex.textContent = data.hourly.uv_index[hourIndex];
        visibility.textContent = `${(data.hourly.visibility[hourIndex] / 1000).toFixed(1)} km`;

        const weather = getWeatherInfo(data.current_weather.weathercode);
        currentWeatherIcon.src = weather.icon;
        currentWeatherIcon.alt = weather.text;

        showWeather();
    } catch (err) {
        showError("Failed to fetch weather data.");
    }
}

// ===================== UI HELPERS =====================
function showLoading() {
    loading.classList.remove("hidden");
    weatherContent.classList.add("hidden");
    errorMessage.classList.add("hidden");
}

function showWeather() {
    loading.classList.add("hidden");
    errorMessage.classList.add("hidden");
    weatherContent.classList.remove("hidden");
}

function showError(message) {
    loading.classList.add("hidden");
    weatherContent.classList.add("hidden");
    errorMessage.querySelector("p").textContent = message;
    errorMessage.classList.remove("hidden");
}

// ===================== WEATHER CODES =====================
function getWeatherInfo(code) {
    const map = {
        0: { text: "Clear Sky", icon: "https://open-meteo.com/images/weather-icons/clear.svg" },
        1: { text: "Mainly Clear", icon: "https://open-meteo.com/images/weather-icons/mostly-clear.svg" },
        2: { text: "Partly Cloudy", icon: "https://open-meteo.com/images/weather-icons/partly-cloudy.svg" },
        3: { text: "Overcast", icon: "https://open-meteo.com/images/weather-icons/overcast.svg" },
        45: { text: "Fog", icon: "https://open-meteo.com/images/weather-icons/fog.svg" },
        61: { text: "Rain", icon: "https://open-meteo.com/images/weather-icons/rain.svg" },
        71: { text: "Snow", icon: "https://open-meteo.com/images/weather-icons/snow.svg" },
        95: { text: "Thunderstorm", icon: "https://open-meteo.com/images/weather-icons/thunderstorm.svg" }
    };

    return map[code] || map[0];
}

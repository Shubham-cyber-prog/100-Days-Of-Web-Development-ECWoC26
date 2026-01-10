// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');
// Elements to update
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const uvIndex = document.getElementById('uvIndex');
const visibility = document.getElementById('visibility');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getCityCoordinates(city);
});
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getCityCoordinates(city);
    }
});

// Get city coordinates
async function getCityCoordinates(city) {
    // UI Reset
    weatherData.classList.add('hidden');
    errorMsg.style.display = 'none';
    loader.style.display = 'block';
    try {
        // Step 1: Geocoding (Get Lat/Lon from City Name)
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        if (!geoData.results) {
            throw new Error("City not found");
        }
        const { latitude, longitude, name, country } = geoData.results[0];
       
        // Step 2: Fetch Weather Data using Lat/Lon
        getWeather(latitude, longitude, name, country);
    } catch (error) {
        loader.style.display = 'none';
        errorMsg.style.display = 'block';
    }
}

// Get weather data
async function getWeather(lat, lon, name, country) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        // Get current hour index for humidity (since Open-Meteo puts humidity in hourly array)
        const currentHour = new Date().toISOString().slice(0, 13) + ":00";
        const hourIndex = data.hourly.time.indexOf(currentHour);
        
        // Get current values
        const currentHumidity = data.hourly.relativehumidity_2m[hourIndex !== -1 ? hourIndex : 0];
        const currentFeelsLike = data.hourly.apparent_temperature[hourIndex !== -1 ? hourIndex : 0];
        const currentUVIndex = data.hourly.uv_index[hourIndex !== -1 ? hourIndex : 0];
        const currentVisibility = data.hourly.visibility[hourIndex !== -1 ? hourIndex : 0];

        // Update UI
        cityName.textContent = `${name}, ${country}`;
        temperature.textContent = Math.round(data.current_weather.temperature);
        windSpeed.textContent = `${data.current_weather.windspeed} km/h`;
        humidity.textContent = `${currentHumidity}%`;
       
        // Convert WMO Weather Code to Text/Icon
        const code = data.current_weather.weathercode;
        condition.textContent = getWeatherDescription(code);
        feelsLike.textContent = `${Math.round(currentFeelsLike)}°C`;
        uvIndex.textContent = currentUVIndex;
        visibility.textContent = `${currentVisibility/1000} km`;
        
        // Convert WMO Weather Code to Text/Icon
        const code = data.current_weather.weathercode;
        const weatherInfo = getWeatherInfo(code);
        condition.textContent = weatherInfo.description;
        weatherIcon.innerHTML = weatherInfo.icon;

        loader.style.display = 'none';
        weatherData.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        loader.style.display = 'none';
        errorMsg.textContent = "Error fetching weather data.";
        errorMsg.style.display = 'block';
    }
}


// Helper to map WMO codes to descriptions and icons
function getWeatherInfo(code) {
    // WMO Weather interpretation codes (WW)
    const weatherCodes = {
        0: "Clear Sky ☀️",
        1: "Mainly Clear 🌤️", 2: "Partly Cloudy ⛅", 3: "Overcast ☁️",
        45: "Fog 🌫", 48: "Depositing Rime Fog 🌫",
        51: "Light Drizzle 🌧", 53: "Moderate Drizzle 🌧", 55: "Dense Drizzle 🌧",
        61: "Slight Rain ☔", 63: "Moderate Rain ☔", 65: "Heavy Rain ☔",
        71: "Slight Snow ❄️", 73: "Moderate Snow ❄️", 75: "Heavy Snow ❄️",
        80: "Slight Rain Showers 🌦", 81: "Moderate Rain Showers 🌦", 82: "Violent Rain Showers ⛈",
        95: "Thunderstorm ⚡", 96: "Thunderstorm with Hail ⛈", 99: "Heavy Hail Thunderstorm ⛈"
    };
    return weatherCodes[code] || "Unknown Weather";
}

const suggestionsBox = document.getElementById('suggestions');

/* Debounce to avoid excessive API calls */
function debounceAutocomplete(fn, delay = 400) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

async function fetchCitySuggestions(query) {
    if (query.length < 2) {
        suggestionsBox.style.display = 'none';
        return;
    }
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.results) {
            suggestionsBox.style.display = 'none';
            return;
        }
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'block';
        data.results.forEach(city => {
            const div = document.createElement('div');
            div.textContent = `${city.name}, ${city.country}`;
            div.style.padding = '12px 16px';
            div.style.cursor = 'pointer';
            div.style.fontSize = '14px';
            div.addEventListener('mouseenter', () => {
                div.style.background = '#f1f5f9';
            });
            div.addEventListener('mouseleave', () => {
                div.style.background = '#fff';
            });
            div.addEventListener('click', () => {
                cityInput.value = city.name;
                suggestionsBox.style.display = 'none';
                getCityCoordinates(city.name);
            });
            suggestionsBox.appendChild(div);
        });
    } catch (err) {
        console.error(err);
        suggestionsBox.style.display = 'none';
    }
}

cityInput.addEventListener(
    'input',
    debounceAutocomplete(e => fetchCitySuggestions(e.target.value))
);

// Hide suggestions on outside click
document.addEventListener('click', e => {
    if (!e.target.closest('#suggestions') && e.target !== cityInput) {
        suggestionsBox.style.display = 'none';
    }
});
        0: { description: "Clear Sky", icon: "<i class='fas fa-sun'></i>" },
        1: { description: "Mainly Clear", icon: "<i class='fas fa-cloud-sun'></i>" },
        2: { description: "Partly Cloudy", icon: "<i class='fas fa-cloud-sun'></i>" },
        3: { description: "Overcast", icon: "<i class='fas fa-cloud'></i>" },
        45: { description: "Fog", icon: "<i class='fas fa-smog'></i>" },
        48: { description: "Depositing Rime Fog", icon: "<i class='fas fa-smog'></i>" },
        51: { description: "Light Drizzle", icon: "<i class='fas fa-cloud-rain'></i>" },
        53: { description: "Moderate Drizzle", icon: "<i class='fas fa-cloud-rain'></i>" },
        55: { description: "Dense Drizzle", icon: "<i class='fas fa-cloud-showers-heavy'></i>" },
        61: { description: "Slight Rain", icon: "<i class='fas fa-cloud-rain'></i>" },
        63: { description: "Moderate Rain", icon: "<i class='fas fa-cloud-showers-heavy'></i>" },
        65: { description: "Heavy Rain", icon: "<i class='fas fa-cloud-showers-heavy'></i>" },
        71: { description: "Slight Snow", icon: "<i class='fas fa-snowflake'></i>" },
        73: { description: "Moderate Snow", icon: "<i class='fas fa-snowflake'></i>" },
        75: { description: "Heavy Snow", icon: "<i class='fas fa-snowflake'></i>" },
        80: { description: "Slight Rain Showers", icon: "<i class='fas fa-cloud-sun-rain'></i>" },
        81: { description: "Moderate Rain Showers", icon: "<i class='fas fa-cloud-sun-rain'></i>" },
        82: { description: "Violent Rain Showers", icon: "<i class='fas fa-cloud-showers-heavy'></i>" },
        95: { description: "Thunderstorm", icon: "<i class='fas fa-bolt'></i>" },
        96: { description: "Thunderstorm with Hail", icon: "<i class='fas fa-bolt'></i>" },
        99: { description: "Heavy Hail Thunderstorm", icon: "<i class='fas fa-bolt'></i>" }
    };
    return weatherCodes[code] || { description: "Unknown Weather", icon: "<i class='fas fa-question'></i>" };
}

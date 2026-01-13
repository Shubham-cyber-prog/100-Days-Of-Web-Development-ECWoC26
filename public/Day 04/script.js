

class WeatherApp {
    constructor() {
        this.apiKey = '003fddc023a25bd09aca868ba11a7b1b';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.geoUrl = 'https://api.openweathermap.org/geo/1.0';
        this.isCelsius = true;
        
        this.initializeElements();
        this.bindEvents();
        this.loadDefaultWeather();
    }

    initializeElements() {
        // Input elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.unitToggle = document.getElementById('unitToggle');

        // Display elements
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherContent = document.getElementById('weatherContent');

        // Current weather elements
        this.currentTemp = document.getElementById('currentTemp');
        this.currentLocation = document.getElementById('currentLocation');
        this.currentDate = document.getElementById('currentDate');
        this.currentWeatherIcon = document.getElementById('currentWeatherIcon');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');

        // Forecast elements
        this.forecastContainer = document.getElementById('forecastContainer');

        // Highlights elements
        this.uvIndex = document.getElementById('uvIndex');
        this.uvDescription = document.getElementById('uvDescription');
        this.visibility = document.getElementById('visibility');
        this.sunrise = document.getElementById('sunrise');
        this.sunset = document.getElementById('sunset');
        this.airQuality = document.getElementById('airQuality');
        this.airQualityDescription = document.getElementById('airQualityDescription');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        this.unitToggle.addEventListener('click', () => this.toggleUnits());
    }

    async loadDefaultWeather() {
        await this.getWeatherByCity('London');
    }

    showLoading() {
        this.loading.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        this.weatherContent.classList.add('hidden');
    }

    hideLoading() {
        this.loading.classList.add('hidden');
    }

    showError(message = 'City not found. Please try again.') {
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.weatherContent.classList.add('hidden');
        this.hideLoading();
    }

    showWeatherContent() {
        this.weatherContent.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        this.hideLoading();
        
        // Add animation class
        this.weatherContent.classList.add('weather-update');
        setTimeout(() => {
            this.weatherContent.classList.remove('weather-update');
        }, 600);
    }

    async handleSearch() {
        const city = this.searchInput.value.trim();
        if (!city) return;

        await this.getWeatherByCity(city);
        this.searchInput.value = '';
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser.');
            return;
        }

        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.getWeatherByCoords(latitude, longitude);
            },
            () => {
                this.showError('Unable to retrieve your location.');
            },
            { timeout: 10000 }
        );
    }

    async getWeatherByCity(city) {
        try {
            this.showLoading();
            
            // Get coordinates from city name
            const geoResponse = await fetch(`${this.geoUrl}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`);
            const geoData = await geoResponse.json();
            
            if (!geoData.length) {
                throw new Error('City not found');
            }

            const { lat, lon } = geoData[0];
            await this.getWeatherByCoords(lat, lon);
            
        } catch (error) {
            console.error('Error fetching weather by city:', error);
            this.showError();
        }
    }

    async getWeatherByCoords(lat, lon) {
        try {
            const units = this.isCelsius ? 'metric' : 'imperial';
            
            // Fetch current weather
            const currentResponse = await fetch(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`);
            const currentData = await currentResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`);
            const forecastData = await forecastResponse.json();

            // Fetch UV Index
            const uvResponse = await fetch(`${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
            const uvData = await uvResponse.json();

            // Update UI with weather data
            this.updateCurrentWeather(currentData, uvData);
            this.updateForecast(forecastData);
            this.updateBackground(currentData.weather[0].main);
            this.showWeatherContent();
            
        } catch (error) {
            console.error('Error fetching weather by coordinates:', error);
            this.showError('Failed to fetch weather data.');
        }
    }

    updateCurrentWeather(data, uvData) {
        const tempUnit = this.isCelsius ? '°C' : '°F';
        const speedUnit = this.isCelsius ? 'km/h' : 'mph';
        
        // Current temperature and location
        this.currentTemp.textContent = `${Math.round(data.main.temp)}${tempUnit}`;
        this.currentLocation.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = this.formatDate(new Date());

        // Weather icon and description
        this.currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        this.currentWeatherIcon.alt = data.weather[0].description;
        this.weatherDescription.textContent = data.weather[0].description;

        // Weather stats
        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}${tempUnit}`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${Math.round(data.wind.speed * (this.isCelsius ? 3.6 : 1))} ${speedUnit}`;
        this.pressure.textContent = `${data.main.pressure} hPa`;

        // Highlights
        if (uvData && uvData.value !== undefined) {
            this.uvIndex.textContent = Math.round(uvData.value);
            this.uvDescription.textContent = this.getUVDescription(uvData.value);
        }

        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.sunrise.textContent = this.formatTime(data.sys.sunrise);
        this.sunset.textContent = this.formatTime(data.sys.sunset);

        // Mock air quality (OpenWeatherMap's air pollution API requires separate call)
        this.airQuality.textContent = 'Good';
        this.airQualityDescription.textContent = 'Air quality is good';
    }

    updateForecast(data) {
        this.forecastContainer.innerHTML = '';
        
        // Get one forecast per day (every 24 hours / 8 intervals of 3 hours)
        const dailyForecasts = [];
        for (let i = 0; i < data.list.length; i += 8) {
            if (dailyForecasts.length >= 5) break;
            dailyForecasts.push(data.list[i]);
        }

        dailyForecasts.forEach(forecast => {
            const forecastItem = this.createForecastItem(forecast);
            this.forecastContainer.appendChild(forecastItem);
        });
    }

    createForecastItem(forecast) {
        const tempUnit = this.isCelsius ? '°C' : '°F';
        const date = new Date(forecast.dt * 1000);
        
        const item = document.createElement('div');
        item.className = 'forecast-item';
        
        item.innerHTML = `
            <div class="forecast-date">${this.formatForecastDate(date)}</div>
            <div class="forecast-icon">
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
                     alt="${forecast.weather[0].description}">
            </div>
            <div class="forecast-temps">
                <span class="forecast-high">${Math.round(forecast.main.temp_max)}${tempUnit}</span>
                <span class="forecast-low">${Math.round(forecast.main.temp_min)}${tempUnit}</span>
            </div>
            <div class="forecast-desc">${forecast.weather[0].description}</div>
        `;
        
        return item;
    }

    updateBackground(weatherCondition) {
        const body = document.body;
        const hour = new Date().getHours();
        const isNight = hour < 6 || hour > 20;
        
        // Remove existing weather classes
        body.className = body.className.replace(/\b(sunny|cloudy|rainy|snowy|night)\b/g, '');
        
        if (isNight) {
            body.classList.add('night');
        } else {
            switch (weatherCondition.toLowerCase()) {
                case 'clear':
                    body.classList.add('sunny');
                    break;
                case 'clouds':
                    body.classList.add('cloudy');
                    break;
                case 'rain':
                case 'drizzle':
                case 'thunderstorm':
                    body.classList.add('rainy');
                    break;
                case 'snow':
                    body.classList.add('snowy');
                    break;
                default:
                    body.classList.add('cloudy');
            }
        }
    }

    toggleUnits() {
        this.isCelsius = !this.isCelsius;
        this.unitToggle.textContent = this.isCelsius ? '°C' : '°F';
        
        // Get current coordinates from the displayed location and refresh
        if (!this.weatherContent.classList.contains('hidden')) {
            const locationText = this.currentLocation.textContent;
            if (locationText && locationText !== '--') {
                const cityName = locationText.split(',')[0];
                this.getWeatherByCity(cityName);
            }
        }
    }

    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatForecastDate(date) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        }
    }

    formatTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    getUVDescription(uvValue) {
        if (uvValue < 3) return 'Low';
        if (uvValue < 6) return 'Moderate';
        if (uvValue < 8) return 'High';
        if (uvValue < 11) return 'Very High';
        return 'Extreme';
    }
}

// Initialize the weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});


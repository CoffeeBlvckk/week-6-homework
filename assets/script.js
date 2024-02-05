// API key for OpenWeatherMap (replace with your actual key)
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

// DOM elements
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

// Event listener for the search form submission
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
});

// Function to fetch weather data from OpenWeatherMap API
function getWeatherData(city) {
    // Use a geocoding API to get the latitude and longitude for the city
    const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(geocodingUrl)
        .then(response => response.json())
        .then(geocodingData => {
            // Extract latitude and longitude from the geocoding data
            const lat = geocodingData.coord.lat;
            const lon = geocodingData.coord.lon;

            // One Call API URL with latitude and longitude
            const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

            // Fetch weather data using One Call API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Display current weather information
                    displayCurrentWeather(data.current);
                    // Display 5-day forecast
                    displayForecast(data.daily);
                    // Add the searched city to the search history
                    addCityToHistory(city);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
}

// Function to display current weather information
function displayCurrentWeather(currentData) {
    // Implement logic to display current weather information
    console.log('Current Weather:', currentData);
}

// Function to display 5-day forecast
function displayForecast(dailyData) {
    // Implement logic to display 5-day forecast
    console.log('5-Day Forecast:', dailyData);
}

// Function to add a city to the search history
function addCityToHistory(city) {
    // Create a list item for the city
    const listItem = document.createElement('li');
    // Set the text content of the list item to the city name
    listItem.textContent = city;
    // Add a click event listener to the list item to allow searching for the city again
    listItem.addEventListener('click', function () {
        getWeatherData(city);
    });
    // Append the list item to the search history list
    historyList.appendChild(listItem);
}

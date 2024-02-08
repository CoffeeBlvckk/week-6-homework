// API key for OpenWeatheather
const apiKey = 'c8fc75b1a349b417aa4c4940d1b96d61';//renamed api key and this is what is generated..

// DOM elements
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const historyList = document.getElementById('historyList');

// Event listener for the search text
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city);
});

// Function to fetch weather data from OpenWeatherMap API
function getWeatherData(city) {
    // Use a geocoding API to get the latitude and longitude for the city
    const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    
    fetch(geocodingUrl)
        .then(response => {
            console.log(response)
            return response.json()})//wrapped in curly brackets and added console log.
        .then(geocodingData => {
            console.log(geocodingData)
            // Extract latitude and longitude from the geocoding data
            const lat = geocodingData.coord.lat;//latitude
            const lon = geocodingData.coord.lon;//longitude

            // Display current weather information
            displayCurrentWeather(geocodingData);//switched to the proper data call
            // One Call API URL with latitude and longitude
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;//imperial = feren.

            // Fetch weather data using One Call API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    // Display 5-day forecast
                    displayForecast(data.list);//data lives in the list
                    // Add the searched city to the search history
                    addCityToHistory(city);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
}
//commented these two lines out because they were coded twice throughout my script and were combatting eachother..leave as reminder
// Function to display current weather information
// function displayCurrentWeather(currentData) {
//     // Implement logic to display current weather information
//     console.log('Current Weather:', currentData);
// }

// Function to display 5-day forecast
// function displayForecast(dailyData) {
//     // Implement logic to display 5-day forecast
//     console.log('5-Day Forecast:', dailyData);
// }
//^^commented out^^

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

//
// Function to display current weather information
function displayCurrentWeather(currentData) {
     // Implement logic to display current weather information
     console.log('Current Weather:', currentData);
    // Assuming you have an element with id 'currentWeatherInfo' for displaying current weather
    const currentWeatherInfo = document.getElementById('currentWeatherInfo');
    const cityName = document.createElement("h2")
    cityName.textContent = currentData.name

    const temp = document.createElement("p")//follow this to creat more p tags. creat p tags for what you want to see on page a sfar as the infor you fetched. this one was for temp.
    temp.textContent = `tempiture: ${currentData.main.temp} degrees`// ${}template expression

    //dispaly humidity
    const humidity = document.createElement("p")
    humidity.textContent = `humidity: ${currentData.main.humidity} %`

    //show visibility
    const visibility = document.createElement("p")
    visibility.textContent = `visibility: ${currentData.visibility} %`

    //display wind
    const wind = document.createElement("p")
    wind.textContent = `wind: ${currentData.wind.speed} mph`

    //display clouds
    const clouds = document.createElement("p")
    clouds.textContent = `clouds: ${currentData.clouds.all}%`// got rid of .main
    
    // Display current weather information on the webpage
    currentWeatherInfo.textContent = `Current Weather: `;
    currentWeatherInfo.append(cityName, temp, humidity, visibility, wind, clouds);// append how to attach multiple things to html
}

// Function to display 5-day forecast
function displayForecast(dailyData) {
      // Implement logic to display 5-day forecast
      console.log('5-Day Forecast:', dailyData);
    
    // Assuming you have an element with id 'forecastInfo' for displaying the forecast
    const forecastInfo = document.getElementById('forecastInfo');
    
    // Display 5-day forecast information on the webpage. not displaying correctly 
    forecastInfo.textContent = `5-Day Forecast:`;

    for (let i= 0; i < 5; i++) {
        const container = document.createElement("div");
        container.setAttribute("class", "five-day");

        const dateEl = document.createElement("p");
        dateEl.textContent = `${dailyData[i].dt_txt}`;

        const tempEl = document.createElement("p");
        tempEl.textContent = `${dailyData[i].main.temp}`;

        const windEl = document.createElement("p");
        windEl.textContent = `${dailyData[i].wind.speed}`;

        const humidityEl = document.createElement("p");
        humidityEl.textContent = `${dailyData[i].main.humidity}`;

        forecastDiv.appendChild(container);
        container.appendChild(dateEl);
        container.appendChild(tempEl);
        container.appendChild(windEl);
        container.appendChild(humidityEl);
    
        
    }
}


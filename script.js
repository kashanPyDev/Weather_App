// Function to fetch weather data
async function fetchWeatherData(city) {
    const apiKey = "391eb8a85e9fb9ae60aee831fef0aab2"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        console.log('Fetch response status:', response.status); // Log the response status
        
        const data = await response.json();
        console.log('API Response:', data); // Log the data received from API

        if (response.status !== 200) {
            throw new Error(data.message); 
        }

        displayWeatherData(data);
    } catch (error) {
        console.error('Fetch error:', error); // Log the error details
        alert(`Error: ${error.message}`);
    }
}

// Function to display weather data in the HTML
function displayWeatherData(data) {
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const humidityElement = document.querySelector(".humidity span");
    const windElement = document.querySelector(".wind span");
    const weatherIcon = document.querySelector(".weather-box img");

    // Set temperature, description, humidity, and wind speed
    temperatureElement.innerHTML = `${Math.round(data.main.temp)}<span>&deg;C</span>`;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${Math.round(data.wind.speed)} km/h`;

    // Set the weather icon based on the API response
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Event listener for the search button
document.querySelector(".search-box button").addEventListener("click", () => {
    const location = document.querySelector(".search-box input").value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location");
    }
});

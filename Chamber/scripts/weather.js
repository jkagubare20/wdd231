// weather.js - Weather functionality module

const myKey = '159ed3d09064b78f7c64f0de2b675559';
const myLong = '30.09244463897517'; 
const myLat = '-1.9535257720178318';

const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

// Fetch current weather data
export async function fetchCurrentWeather() {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Fetch forecast data
export async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const myTemperature = document.getElementById('temperature');
    const myDescription = document.getElementById('description');
    
    if (myTemperature && myDescription) {
        myTemperature.textContent = `Current Temperature: ${data.main.temp.toFixed(0)}°F - ${data.weather[0].description}`;
        
    }
}

// Display forecast
function displayForecast(data) {
    const myForecast1 = document.getElementById('forecast-1');
    const myForecast2 = document.getElementById('forecast-2');
    const myForecast3 = document.getElementById('forecast-3');
    
    if (!myForecast1 || !myForecast2 || !myForecast3) return;
    
    try {
        const forecasts = [data.list[8], data.list[16], data.list[24]];
        
        myForecast1.textContent = `Tomorrow: ${forecasts[0].main.temp.toFixed(0)}°F - ${forecasts[0].weather[0].description}`;
        myForecast2.textContent = `Day 2: ${forecasts[1].main.temp.toFixed(0)}°F - ${forecasts[1].weather[0].description}`;
        myForecast3.textContent = `Day 3: ${forecasts[2].main.temp.toFixed(0)}°F - ${forecasts[2].weather[0].description}`;
    } catch (error) {
        console.log(error);
    }
}

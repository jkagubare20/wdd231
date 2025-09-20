const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = `${currentYear}`;

const lastModifiedDate = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified on: ${lastModifiedDate}`;

// Hamburger menu functionality
const hamburger = document.getElementById('ham-btn');
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('show');
    navigation.classList.toggle('show');
});

// Weather API functionality
const myTemperature = document.getElementById('temperature');
const myDescription = document.getElementById('description');
const myForecast1 = document.getElementById('forecast-1');
const myForecast2 = document.getElementById('forecast-2');
const myForecast3 = document.getElementById('forecast-3');

const myKey = '159ed3d09064b78f7c64f0de2b675559';
const myLong = '30.09244463897517'; 
const myLat = '-1.9535257720178318';


const apiURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
apiFetch();

function displayResults(data) {
    myTemperature.textContent = `Current Temperature: ${data.main.temp.toFixed(0)} °F`;
    myDescription.textContent = `Current Conditions: ${data.weather[0].description}`;  
}

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error fetching forecast data:', error);
        myForecast1.textContent = "Forecast unavailable";
        myForecast2.textContent = "Forecast unavailable";
        myForecast3.textContent = "Forecast unavailable";
    }
}

function displayForecast(data) {
    // Get forecast for next 3 days (every 8th item is roughly 24 hours apart)
    const forecasts = [data.list[8], data.list[16], data.list[24]];
    
    myForecast1.textContent = `Tomorrow: ${forecasts[0].main.temp.toFixed(0)}°F - ${forecasts[0].weather[0].description}`;
    myForecast2.textContent = `Day 2: ${forecasts[1].main.temp.toFixed(0)}°F - ${forecasts[1].weather[0].description}`;
    myForecast3.textContent = `Day 3: ${forecasts[2].main.temp.toFixed(0)}°F - ${forecasts[2].weather[0].description}`;
}

// Fetch and display directory data
async function fetchDirectoryData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Get the container where we'll display cards
        const container = document.querySelector('.spotlight-container');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Get only the first 3 members
        const spotlightMembers = data.members.slice(0, 2);
        
        // Create cards for only the first 3 members
        spotlightMembers.forEach((member, index) => {
            
            const memberDiv = document.createElement('div');
            memberDiv.className = 'info-card';
            memberDiv.innerHTML = `
                <img src="images/${member.imageFileName}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership:</strong> ${member.membershipLevel}</p>
                <p><strong>Description:</strong> ${member.description}</p>
            `;
            container.appendChild(memberDiv);
        });
        
    } catch (error) {
        console.error('Error fetching directory data:', error);
        const container = document.querySelector('.spotlight-container');
        if (container) {
            container.innerHTML = '<p>Unable to load spotlight data. Please try again later.</p>';
        }
    }
}

fetchDirectoryData();
apiFetch();
fetchForecast();
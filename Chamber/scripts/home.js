import { fetchCurrentWeather, fetchForecast } from './weather.js' 
import { initializeDates, initializeHamburgerMenu } from './directory.js';

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
        
        // Get only the first 2 members
        const spotlightMembers = data.members.slice(0, 2);
        
        // Create cards for only the first 2 members
        spotlightMembers.forEach((member, index) => {
            
            const memberDiv = document.createElement('div');
            memberDiv.className = 'info-card';
            memberDiv.innerHTML = `
                <img src="images/${member.imageFileName}" alt="${member.name}">
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
    }
}

initializeDates;
initializeHamburgerMenu;
fetchDirectoryData();
fetchCurrentWeather();
fetchForecast();
import { fetchCurrentWeather, fetchForecast } from './weather.js';
import { initializeDates, initializeHamburgerMenu } from './ui.js';


document.addEventListener('DOMContentLoaded', function() {
    
    initializeDates();
    initializeHamburgerMenu();

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
                // Highlight gold and silver members randomly
                // Filter gold and silver members
                const goldSilverMembers = data.members.filter(m =>
                    m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver'
                );
                // Shuffle the array
                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }
                shuffle(goldSilverMembers);
                // Select up to 2 random gold/silver members
                const randomSpotlights = goldSilverMembers.slice(0, 2);

                // Clear container and display random spotlights
                container.innerHTML = '';
                randomSpotlights.forEach(member => {
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
            });

        } catch (error) {
            console.error('Error fetching directory data:', error);
        }
    }

    fetchDirectoryData();
    fetchCurrentWeather();
    fetchForecast();
});
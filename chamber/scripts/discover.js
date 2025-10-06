import { initializeDates, initializeHamburgerMenu } from './ui.js';

// Constant for the local storage key
const LAST_VISIT_KEY = 'lastVisitDate';
// Constant for the element where the message will be displayed
const MESSAGE_CONTAINER_SELECTOR = '#visit-message';

/**
 * Calculates the difference between the current date and the last visit date 
 * stored in local storage, and displays a corresponding message.
 */
function displayVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const messageContainer = document.querySelector(MESSAGE_CONTAINER_SELECTOR);
    let message = '';

    if (!messageContainer) {
        console.error('Visit message container not found.');
        return;
    }

    if (lastVisit === null) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTimestamp = parseInt(lastVisit, 10);
        // Time difference in milliseconds
        const timeDifferenceMs = now - lastVisitTimestamp;
        // Convert to days, rounded down to get the whole number of days
        const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
        
        // Time difference in hours for less than a day check
        const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

        if (hoursDifference < 24) {
            // Less than a day
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day ago
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day ago
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Display the message
    messageContainer.innerHTML = `<p>${message}</p>`;

    // Store the current visit date for the next time
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
}

document.addEventListener('DOMContentLoaded', function() {
    
    initializeDates();
    initializeHamburgerMenu();
    
    // Step 1: Display the message immediately upon page load
    displayVisitMessage();

    async function fetchDirectoryData() {
        try {
            const response = await fetch('data/places.json');
            const data = await response.json();
            
            // Fixed: Added the dot for class selector
            const container = document.querySelector('.grid');
            
            // Clear existing content
            container.innerHTML = '';
            
            // Loop through each place and create HTML
            data.places.forEach(place => {
                const card = document.createElement('div');
                card.className = 'info-card';
                card.innerHTML = `
                    <img src="images/${place.photo}" alt="${place.name}" loading="lazy">
                    <div class="card-content">
                        <h3>${place.name}</h3>
                        <p><strong>Address:</strong> ${place.address}</p>
                        <p><strong>Cost:</strong> ${place.cost}</p>
                        <p class="description">${place.description}</p>
                    </div>
                `;
                container.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching directory data:', error);
        }
    }
    fetchDirectoryData();
});
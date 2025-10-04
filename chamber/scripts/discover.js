import { initializeDates, initializeHamburgerMenu } from './ui.js';

document.addEventListener('DOMContentLoaded', function() {
    
    initializeDates();
    initializeHamburgerMenu();

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
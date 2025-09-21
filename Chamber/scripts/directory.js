export function initializeDates() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById("lastModified").textContent = `Last modified on: ${lastModifiedDate}`;
}
// Hamburger menu functionality
export function initializeHamburgerMenu() {
    const hamburger = document.getElementById('ham-btn');
    const navigation = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('show');
        navigation.classList.toggle('show');
    });
}

// Fetch and display directory data
async function fetchDirectoryData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // Get the container where we'll display all cards
        const container = document.querySelector('article.grid');
        
        // Clear existing content
        container.innerHTML = '';
        
        // Loop through each member and create HTML
        data.members.forEach(member => {
            const section = document.createElement('section');
            section.innerHTML = `
                <div class="info-card">
                    <img src="images/${member.imageFileName}" alt="${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership:</strong> ${member.membershipLevel}</p>
                    <p><strong>Description:</strong> ${member.description}</p>
                </div>
            `;
            container.appendChild(section);
        });
    } catch (error) {
        console.error('Error fetching directory data:', error);
    }
}

fetchDirectoryData();

// Grid/List view toggle functionality
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}


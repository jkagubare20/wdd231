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
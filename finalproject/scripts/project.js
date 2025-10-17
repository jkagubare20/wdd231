import { initializeDates, initializeHamburgerMenu } from './ui.js';

initializeDates();
initializeHamburgerMenu();

const openButtons = document.querySelectorAll('.openButton');
const closeButtons = document.querySelectorAll('.closeButton');

// Open dialog buttons
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dialogId = button.getAttribute('data-dialog');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.showModal();
        }
    });
});

// Close dialog buttons
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dialog = button.closest('dialog');
        if (dialog) {
            dialog.close();
        }
    });
});

// Form Handling with LocalStorage
const form = document.getElementById('application-form');

if (form) {
    // Set timestamp when form loads
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Load saved form data from localStorage
    const loadFormData = () => {
        const savedData = localStorage.getItem('donationFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            // Populate form fields with saved data
            if (formData.firstname) document.getElementById('firstname').value = formData.firstname;
            if (formData.lastname) document.getElementById('lastname').value = formData.lastname;
            if (formData.email) document.getElementById('email').value = formData.email;
            if (formData.telephone) document.getElementById('telephone').value = formData.telephone;
            
            // Set radio button
            if (formData.membership) {
                const radio = document.querySelector(`input[name="membership"][value="${formData.membership}"]`);
                if (radio) radio.checked = true;
            }
        }
    };

    // Save form data to localStorage
    const saveFormData = () => {
        const formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            membership: document.querySelector('input[name="membership"]:checked')?.value || '',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('donationFormData', JSON.stringify(formData));
    };

    // Auto-save form data as user types
    form.addEventListener('input', saveFormData);

    // Save form data and add all donations to history on submit
    form.addEventListener('submit', (e) => {
        // Update timestamp on submit
        if (timestampInput) {
            timestampInput.value = new Date().toISOString();
        }
        
        saveFormData();
        
        // Save to donation history
        const formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            membership: document.querySelector('input[name="membership"]:checked')?.value || '',
            timestamp: new Date().toISOString()
        };
        
        // Get existing donation history
        let donationHistory = JSON.parse(localStorage.getItem('donationHistory') || '[]');
        
        // Add new donation to history
        donationHistory.push(formData);
        
        // Save updated history
        localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
        
        // Clear the form data after successful submission
        localStorage.removeItem('donationFormData');
    });

    // Load saved data when page loads
    loadFormData();
}

// Display donation count (optional feature)
const displayDonationCount = () => {
    const donationHistory = JSON.parse(localStorage.getItem('donationHistory') || '[]');
    const countElement = document.getElementById('donationCount');
    if (countElement) {
        countElement.textContent = donationHistory.length;
    }
};

// Footer - Current Year and Last Modified
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
}

// Initialize donation count on page load
displayDonationCount();
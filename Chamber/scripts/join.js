document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    // Set last modified date
    const lastModifiedDate = document.lastModified;
    document.getElementById("lastModified").textContent = `Last modified on: ${lastModifiedDate}`;

    // Hamburger menu functionality
    const hamburger = document.getElementById('ham-btn');
    const navigation = document.querySelector('.navigation');

    if (hamburger && navigation) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('show');
            navigation.classList.toggle('show');
        });
    }

    // Dialog functionality for membership cards
    const openButtons = document.querySelectorAll(".openButton");
    const closeButtons = document.querySelectorAll(".closeButton");

    // Add event listeners to all open buttons
    openButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const dialogId = button.getAttribute("data-dialog");
            const dialog = document.getElementById(dialogId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    // Add event listeners to all close buttons
    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const dialog = button.closest("dialog");
            if (dialog) {
                dialog.close();
            }
        });
    });

    // Close dialog when clicking on backdrop
    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.addEventListener("click", (e) => {
            if (e.target === dialog) {
                dialog.close();
            }
        });
    });

    // Set timestamp IMMEDIATELY when page loads (not on submit)
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const timeStamp = new Date().toISOString();
        timestampField.value = timeStamp;
        console.log("Timestamp set to:", timeStamp);
    }

    // Update timestamp again right before form submission
    const form = document.querySelector('.application-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Update timestamp to the exact moment of submission
            const timeStamp = new Date().getDate();
            const timestampField = document.getElementById("timestamp");
            if (timestampField) {
                timestampField.value = timeStamp;
                console.log("Timestamp updated on submit:", timeStamp);
            }
            // Form will now submit to thankyou.html with the timestamp
        });
    }
});
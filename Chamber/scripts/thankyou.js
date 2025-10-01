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

    // Get form data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const resultsDisplay = document.getElementById('results-display');

    if (resultsDisplay && urlParams.toString()) {
        // Extract all form data
        const firstName = urlParams.get('fname') || 'N/A';
        const lastName = urlParams.get('lname') || 'N/A';
        const organizationalTitle = urlParams.get('organizational-title') || 'N/A';
        const email = urlParams.get('email') || 'N/A';
        const phone = urlParams.get('phone') || 'N/A';
        const businessName = urlParams.get('business-name') || 'N/A';
        const membership = urlParams.get('membership') || 'N/A';
        const description = urlParams.get('organization-description') || 'N/A';
        const timestamp = urlParams.get('timestamp') || 'N/A';

        // Format timestamp if it exists
        let formattedTimestamp = timestamp;
        if (timestamp !== 'N/A') {
            const date = new Date(timestamp);
            formattedTimestamp = date.toLocaleString();
        }

        // Format membership level
        const membershipLevels = {
            'np': 'Non-Profit Membership',
            'bronze': 'Bronze Membership',
            'silver': 'Silver Membership',
            'gold': 'Gold Membership'
        };
        const formattedMembership = membershipLevels[membership] || membership;

        // Create the HTML to display
        const displayHTML = `
            <div class="form-results">
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Organizational Title:</strong> ${organizationalTitle}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Business Name:</strong> ${businessName}</p>
                <p><strong>Membership Level:</strong> ${formattedMembership}</p>
                <p><strong>Business Description:</strong> ${description}</p>
                <p><strong>Submitted on:</strong> ${formattedTimestamp}</p>
            </div>
        `;

        // Display the results
        resultsDisplay.innerHTML = displayHTML;
    } else if (resultsDisplay) {
        resultsDisplay.innerHTML = '<p>No form data received.</p>';
    }
});
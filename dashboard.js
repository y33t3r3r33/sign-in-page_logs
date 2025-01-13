// Check if the user is logged in when the page loads
window.onload = function () {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html"; // If the user is not logged in, redirect to login page
    } else {
        // Load and display user data
        const fullName = localStorage.getItem("fullName");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");

        document.getElementById("username-display").innerText = fullName;
        document.getElementById("role-display").innerText = `Role: ${role}`;

        // Show the login logs only if the user is an admin
        if (role === "IT", "IT Manager") {
            // Load activities (from loginLogs)
            const activities = JSON.parse(localStorage.getItem("loginLogs")) || [];
            const activityList = document.getElementById("activity-list");
            activities.forEach(activity => {
                const li = document.createElement("li");
                li.innerText = `${activity.username} - ${activity.action} at ${activity.timestamp}`;
                activityList.appendChild(li);
            });

            // Show the Clear Logs button for admins
            document.getElementById("clear-logs-btn").style.display = "inline-block"; 
        } else {
            // If not an admin, hide the activity section or leave it empty
            document.getElementById("activity-section").style.display = "none";
        }
    }
};

// Handle logout
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("theme");
    window.location.href = "index.html"; // Redirect to login page
});

// Handle the Clear Logs button (only for admin)
document.getElementById("clear-logs-btn").addEventListener("click", function () {
    // Clear the login logs from localStorage
    localStorage.removeItem("loginLogs");

    // Clear the activity list from the UI
    const activityList = document.getElementById("activity-list");
    activityList.innerHTML = ""; // Clear the log display

    alert("Login logs have been cleared.");
});

// Settings modal functionality
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsBtn = document.getElementById("close-settings-btn");

settingsBtn.addEventListener("click", function () {
    settingsModal.classList.add("open");
});

closeSettingsBtn.addEventListener("click", function () {
    settingsModal.classList.remove("open");
});

// Dark mode toggle functionality
document.getElementById("theme-toggle").addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});

// Save user info (full name, email, password) from the settings form
document.getElementById("update-info-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const updatedFullName = document.getElementById("full-name").value;
    const updatedEmail = document.getElementById("email").value;
    const updatedPassword = document.getElementById("password").value;

    // Update the information in localStorage
    localStorage.setItem("fullName", updatedFullName);
    localStorage.setItem("email", updatedEmail);
    localStorage.setItem("password", updatedPassword); // Insecure, just for demo purposes

    // Close the settings modal after saving
    settingsModal.classList.remove("open");

    // Reflect the updated information immediately on the dashboard
    document.getElementById("username-display").innerText = updatedFullName;
    document.getElementById("role-display").innerText = `Role: ${localStorage.getItem("role")}`;
    alert("Settings updated successfully!");
});

// Close modal if user clicks outside of it
window.addEventListener("click", function (e) {
    // If the clicked element is not the modal content or the settings button, close the modal
    if (e.target === settingsModal) {
        settingsModal.classList.remove("open");
    }
});

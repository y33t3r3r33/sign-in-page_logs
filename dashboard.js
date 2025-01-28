// Function to fetch logs from the server
async function fetchLogs() {
    try {
        const response = await fetch('http://localhost:3000/logs');
        const logs = await response.json();
        return logs;
    } catch (error) {
        console.error('Error fetching logs:', error);
        return [];
    }
}

// Function to save a log to the server
async function saveLog(log) {
    try {
        const response = await fetch('http://localhost:3000/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        });
        return await response.json();
    } catch (error) {
        console.error('Error saving log:', error);
    }
}

// Function to log user activities to the server
async function logActivity(action) {
    const log = {
        ID: localStorage.getItem("ID"),
        IP: localStorage.getItem("IP"),
        action: action,
        timestamp: new Date().toLocaleString()
    };
    await saveLog(log);
}

// Check if the user is logged in when the page loads
window.onload = async function () {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html"; // If the user is not logged in, redirect to login page
    } else {
        // Load and display user data
        const fullName = localStorage.getItem("fullName");
        const role = localStorage.getItem("role");
        const IP = localStorage.getItem("IP");

        document.getElementById("ID-display").innerText = fullName;
        document.getElementById("role-display").innerText = `Role: ${role}`;
        document.getElementById("IP-display").innerText = `IP: ${IP}`;

        // Fetch and display logs
        const activities = await fetchLogs();
        const activityList = document.getElementById("activity-list");
        activities.forEach(activity => {
            const li = document.createElement("li");
            li.innerText = `${activity.ID} - ${activity.IP} - ${activity.action} at ${activity.timestamp}`;
            activityList.appendChild(li);
        });

        // Show the Clear Logs button for admins
        if (role == "IT" || role == "TEST") {
            document.getElementById("clear-logs-btn").style.display = "inline-block"; 
        } else {
            document.getElementById("activity-list").style.display = "none";
        }
    }
};

// Handle logout
document.getElementById("logout-btn").addEventListener("click", async function () {
    await logActivity("Logout");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("theme");
    localStorage.removeItem("IP");
    window.location.href = "index.html"; // Redirect to login page
});

// Handle the Clear Logs button (only for admin)
document.getElementById("clear-logs-btn").addEventListener("click", async function () {
    // Clear the login logs from the server
    await fetch('http://localhost:3000/logs', { method: 'DELETE' });

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
    document.getElementById("ID-display").innerText = updatedFullName;
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
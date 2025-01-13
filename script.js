// Simulating a simple set of users for the login
const users = [
    { username: "johnbar2", password: "w@9B*aaq&js", fullName: "Bartholomule John 2nd", role: "Account Manager" },
    { username: "eathanche", password: "^%oyMSSBPO8:", fullName: "Ethan Chen", role: "Loan Officer" },
    { username: "weismi", password: "p*ga6)g#38DF", fullName: "Wei Smith", role: "Accounting Manager"},
    { username: "priyaali", password: "#O)<[3;9}jHa", fullName: "Priya Ali", role: "IT Manager"},
    { username: "emmaali", password: "=L0Y|_0R<(<g", fullName: "Emma Ali", role: "Bank Teller"},
    { username: "charlottehar", password: "w|1E2Abi<F=O", fullName: "Charlotte Harris", role: "Loan Officer"},
    { username: "avamil", password: "L{a5o12,ad!+", fullName: "Ava Miller", role: "IT"},
    { username: "oliviawil", password: "&@M;1e?3tA!2", fullName: "Olivia Williams", role: "Accounting"},
    { username: "mohammadsmi", password: ".#JUo],FY5]e", fullName: "Mohammad Smith", role: "Credit Card Saleman"},
    { username: "juanngu", password: "j)]5Rs*[twXO", fullName: "Juan Nguyen", role: "Bank Teller"},
    { username: "charlottekum", password: "&?pPyoRhfQi5", fullName: "Charlotte Kumar", role: "IT"},
    { username: "priyamar", password: "EP^3=1oVd(o}", fullName: "Priya Martin", role: "Bank Teller"},
    { username: "carlossai", password: "smoooooothoperator", fullName: "Carlos Sainz", role: "F1 Driver"},
    { username: "lucaswil", password: "=9ys-guX>nDX", fullName: "Lucas Williams", role: "Credit Card Salesman"},
    { username: "mohammadtho", password: "YXKVEec3XQA9FL95HC5i", fullName: "Mohammad Thomas", role: "Accounting"},
    { username: "ameliakim", password: "e(Ky3Q?=A5[3Imu{", fullName: "Amelia Kim", role: "Logistics"},
    { username: "benjaminmar", password: "ay6e3UG8KTMecuOaLjqz", fullName: "Benjamin Martinez", role: "Teller Manager"},
    { username: "maxver", password: "4timeworldchampion", fullName: "Max Verstappen", role: "F1 Driver"}
];

// Check if user is logged in on page load
window.onload = function () {
    if (localStorage.getItem("isLoggedIn")) {
        window.location.href = "dashboard.html";
    }
};

// Handle login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Check if credentials are correct
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Successful login
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("role", user.role);
        logActivity("Login");
        window.location.href = "dashboard.html";
    } else {
        // Invalid credentials
        document.getElementById("error-message").innerText = "Invalid username or password.";
    }
});

// Function to log user activities to localStorage
function logActivity(action) {
    const activities = JSON.parse(localStorage.getItem("loginLogs")) || [];
    const newActivity = {
        username: localStorage.getItem("username"),
        action: action,
        timestamp: new Date().toLocaleString()
    };
    activities.push(newActivity);
    localStorage.setItem("loginLogs", JSON.stringify(activities));
}

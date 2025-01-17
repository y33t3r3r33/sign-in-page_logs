// Simulating a simple set of users for the login
const users = [
    { ID: "19557400", password: "w@9B*aaq&js", fullName: "Bartholomule John 2nd", role: "Account Manager", IP: "192.168.0.168" },
    { ID: "25323122", password: "^%oyMSSBPO8:", fullName: "Ethan Chen", role: "Loan Officer", IP: "192.168.0.152" },
    { ID: "09820158", password: "p*ga6)g#38DF", fullName: "Wei Smith", role: "Accounting Manager", IP: "192.168.0.138" },
    { ID: "51758413", password: "#O)<[3;9}jHa", fullName: "Priya Ali", role: "IT Manager", IP: "192.168.0.038" },
    { ID: "77679509", password: "=L0Y|_0R<(<g", fullName: "Emma Ali", role: "Bank Teller", IP: "192.168.0.108" },
    { ID: "86672506", password: "w|1E2Abi<F=O", fullName: "Charlotte Harris", role: "Loan Officer", IP: "192.168.0.109" },
    { ID: "04767522", password: "L{a5o12,ad!+", fullName: "Ava Miller", role: "IT", IP: "192.168.0.123" },
    { ID: "32701602", password: "&@M;1e?3tA!2", fullName: "Olivia Williams", role: "Accounting", IP: "192.168.0.663" },
    { ID: "32163894", password: ".#JUo],FY5]e", fullName: "Mohammad Smith", role: "Credit Card Saleman", IP: "192.168.0.128" },
    { ID: "48466165", password: "j)]5Rs*[twXO", fullName: "Juan Nguyen", role: "Bank Teller", IP: "192.168.0.192" },
    { ID: "14391146", password: "&?pPyoRhfQi5", fullName: "Charlotte Kumar", role: "IT", IP: "192.168.0.145" },
    { ID: "88374363", password: "EP^3=1oVd(o}", fullName: "Priya Martin", role: "Bank Teller", IP: "192.168.0.124" },
    { ID: "96533919", password: "smoooooothoperator", fullName: "Carlos Sainz", role: "F1 Driver", IP: "192.168.0.134" },
    { ID: "64948566", password: "=9ys-guX>nDX", fullName: "Lucas Williams", role: "Credit Card Salesman", IP: "192.168.0.144" },
    { ID: "31628167", password: "YXKVEec3XQA9FL95HC5i", fullName: "Mohammad Thomas", role: "Accounting", IP: "192.168.0.125" },
    { ID: "91628710", password: "e(Ky3Q?=A5[3Imu{", fullName: "Amelia Kim", role: "Logistics", IP: "192.168.0.149" },
    { ID: "12493268", password: "ay6e3UG8KTMecuOaLjqz", fullName: "Benjamin Martinez", role: "Teller Manager", IP: "192.168.0.158" },
    { ID: "72523995", password: "4timeworldchampion", fullName: "Max Verstappen", role: "F1 Driver", IP: "192.168.0.178" },
    { ID: "mrslang", password: "password", fullName: "Mrs.Lang", role: "Teacher", IP: "192.168.0.177" },
    { ID: "TEST", password: "TEST", fullName: "TEST", role: "TEST", IP: "TEST" }
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
    
    const ID = document.getElementById("ID").value;
    const password = document.getElementById("password").value;
    
    // Check if credentials are correct
    const user = users.find(u => u.ID === ID && u.password === password);
    
    if (user) {
        // Successful login
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("ID", ID);
        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("role", user.role);
        localStorage.setItem("IP", user.IP);
        logActivity("Login");
        window.location.href = "dashboard.html";
    } else {
        // Invalid credentials
        document.getElementById("error-message").innerText = "Invalid ID or password.";
    }
});

// Function to log user activities to localStorage
function logActivity(action) {
    const activities = JSON.parse(localStorage.getItem("loginLogs")) || [];
    const newActivity = {
        ID: localStorage.getItem("ID"),
        IP: localStorage.getItem("IP"),
        action: action,
        timestamp: new Date().toLocaleString()
    };
    activities.push(newActivity);
    localStorage.setItem("loginLogs", JSON.stringify(activities));
}

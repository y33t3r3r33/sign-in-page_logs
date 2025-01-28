// Simulating a simple set of users for the login
const users = [
    { ID: "19557400", password: "w@9B*aaq&js", fullName: "Bartholomule John 2nd", role: "Account Manager" },
    { ID: "25323122", password: "^%oyMSSBPO8:", fullName: "Ethan Chen", role: "Loan Officer" },
    { ID: "09820158", password: "p*ga6)g#38DF", fullName: "Wei Smith", role: "Accounting Manager" },
    { ID: "51758413", password: "#O)<[3;9}jHa", fullName: "Priya Ali", role: "IT Manager" },
    { ID: "77679509", password: "=L0Y|_0R<(<g", fullName: "Emma Ali", role: "Bank Teller" },
    { ID: "86672506", password: "w|1E2Abi<F=O", fullName: "Charlotte Harris", role: "Loan Officer" },
    { ID: "04767522", password: "L{a5o12,ad!+", fullName: "Ava Miller", role: "IT" },
    { ID: "32701602", password: "&@M;1e?3tA!2", fullName: "Olivia Williams", role: "Accounting" },
    { ID: "32163894", password: ".#JUo],FY5]e", fullName: "Mohammad Smith", role: "Credit Card Saleman" },
    { ID: "48466165", password: "j)]5Rs*[twXO", fullName: "Juan Nguyen", role: "Bank Teller" },
    { ID: "14391146", password: "&?pPyoRhfQi5", fullName: "Charlotte Kumar", role: "IT" },
    { ID: "88374363", password: "EP^3=1oVd(o}", fullName: "Priya Martin", role: "Bank Teller" },
    { ID: "96533919", password: "smoooooothoperator", fullName: "Carlos Sainz", role: "F1 Driver" },
    { ID: "64948566", password: "=9ys-guX>nDX", fullName: "Lucas Williams", role: "Credit Card Salesman" },
    { ID: "31628167", password: "YXKVEec3XQA9FL95HC5i", fullName: "Mohammad Thomas", role: "Accounting" },
    { ID: "91628710", password: "e(Ky3Q?=A5[3Imu{", fullName: "Amelia Kim", role: "Logistics" },
    { ID: "12493268", password: "ay6e3UG8KTMecuOaLjqz", fullName: "Benjamin Martinez", role: "Teller Manager" },
    { ID: "72523995", password: "4timeworldchampion", fullName: "Max Verstappen", role: "F1 Driver" },
    { ID: "mrslang", password: "password", fullName: "Mrs.Lang", role: "Teacher" },
    { ID: "TEST", password: "TEST", fullName: "TEST", role: "TEST" }
];

// Function to fetch the local IP address using WebRTC
async function fetchLocalIPAddress() {
    return new Promise((resolve, reject) => {
        const peerConnection = new RTCPeerConnection();
        peerConnection.createDataChannel('');
        peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));
        peerConnection.onicecandidate = event => {
            if (event && event.candidate && event.candidate.candidate) {
                const candidate = event.candidate.candidate;
                const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
                const ipAddress = ipRegex.exec(candidate);
                if (ipAddress) {
                    console.log('Local IP address found:', ipAddress[0]);
                    resolve(ipAddress[0]);
                    peerConnection.close();
                }
            }
        };
        setTimeout(() => {
            console.error('Failed to fetch local IP address');
            reject('Failed to fetch local IP address');
            peerConnection.close();
        }, 1000);
    });
}

// Function to fetch the public IP address using ipify
async function fetchPublicIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('Public IP address found:', data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        return 'Unknown IP';
    }
}

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

// Check if user is logged in on page load
window.onload = async function () {
    if (localStorage.getItem("isLoggedIn")) {
        window.location.href = "dashboard.html";
    }
};

// Handle login
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const ID = document.getElementById("ID").value;
    const password = document.getElementById("password").value;
    
    // Check if credentials are correct
    const user = users.find(u => u.ID === ID && u.password === password);
    
    if (user) {
        // Fetch the local IP address
        let IP = await fetchLocalIPAddress().catch(error => {
            console.error(error);
            return null;
        });

        // If local IP address is not available, fetch the public IP address
        if (!IP) {
            IP = await fetchPublicIPAddress();
        }

        // Successful login
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("ID", ID);
        localStorage.setItem("fullName", user.fullName);
        localStorage.setItem("role", user.role);
        localStorage.setItem("IP", IP);
        await logActivity("Login");
        window.location.href = "dashboard.html";
    } else {
        // Invalid credentials
        document.getElementById("error-message").innerText = "Invalid ID or password.";
    }
});

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
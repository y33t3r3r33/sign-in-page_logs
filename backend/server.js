const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Set CSP header to allow images from the same origin
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self'");
    next();
});

let logs = [];

// Endpoint to get logs
app.get('/logs', (req, res) => {
    res.json(logs);
});

// Endpoint to add a log
app.post('/logs', (req, res) => {
    const log = req.body;
    logs.push(log);
    res.status(201).json(log);
});

// Endpoint for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the logging server!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

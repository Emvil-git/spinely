// Uncomment related functions Navbar.jsx

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Move this line up to use JSON parsing middleware

// Define routes related to session and monitoring
let latestSessionNumber = 1;
let currentDate = new Date().toLocaleDateString(); // Initialize with a specific date for testing

// Function to update session number and current date only when a new session starts
const updateSessionNumber = () => {
    const newDate = new Date().toLocaleDateString();
    
    // Check if the current date matches the stored date
    if (currentDate === newDate) {
        // If it's the same day, do nothing
        return;
    }

    // Otherwise, update the current date and increment the session number
    currentDate = newDate; // Update current date
    latestSessionNumber++; // Increment session number
};

// Route to fetch the latest session number
app.get('/latestSessionNumber', (req, res) => {
    updateSessionNumber(); // Update session number and current date before sending response
    res.json({ latestSessionNumber });
});


// Route to handle session start/end/continue details
app.post('/sessionDetails', (req, res) => {
    const { action, date } = req.body;
    if (action === 'start') {
        // Simulate session start
        console.log(`Session ${latestSessionNumber} started on ${date}`);
        // Update the current date and latest session number
    } else if (action === 'end') {
        // Simulate session end
        console.log(`Session ${latestSessionNumber} ended on ${date}`);
    } else if (action === 'continued') {
        // Simulate session continue
        console.log(`Session ${latestSessionNumber} continued on ${date}`);
    }
    res.send('Session details received successfully');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Immediately update session number and current date when server starts
updateSessionNumber();

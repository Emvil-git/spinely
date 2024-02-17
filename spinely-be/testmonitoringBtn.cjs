const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let latestSessionNumber = 1; // User's nth session, (ex. Session 1, Session 2) 
let currentDate = new Date().toLocaleDateString();

// Update nth session and current date only when a new session starts; think of a game streak
const updateSessionNumber = () => {
    const newDate = new Date().toLocaleDateString();
    
    // Check if the current date matches the stored date
    if (currentDate === newDate) {
        return;
    }

    // Otherwise, update current date and session number
    currentDate = newDate; // Update current date
    latestSessionNumber++; // Increment session number
};

app.get('/latestSessionNumber', (req, res) => {
    updateSessionNumber(); 
    res.json({ latestSessionNumber });
});


// Handle session start/end/continue details, for testing purposes,can be discarded; reflect change to Navbar.jsx in sendSessionDetails
app.post('/sessionDetails', (req, res) => {
    const { action, date } = req.body;
    if (action === 'start') {
        console.log(`Session ${latestSessionNumber} started on ${date}`);
    } else if (action === 'end') {
        console.log(`Session ${latestSessionNumber} ended on ${date}`);
    } else if (action === 'continued') {
        console.log(`Session ${latestSessionNumber} continued on ${date}`);
    }
    res.send('Session details received successfully');
});

// Start the server; for testing only, can be discarded
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Update session number & current date when server starts
updateSessionNumber();

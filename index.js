// index.js

// Import required modules
import express from 'express';

// Create an Express application
const app = express();

// Define a simple endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

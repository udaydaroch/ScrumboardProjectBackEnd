// index.js

// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define a simple endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
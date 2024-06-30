// index.js
const express = require('express');
const getUsers = require('./app.js');

const app = express();

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello' });
});

app.get('/', (req, res) => {
    res.json({ message: 'This is working' });
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'https://scrumboard-project.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // to parse JSON request bodies
app.use(userRoutes); // Use userRoutes middleware

app.get('/', (req, res) => {
    res.send('I am here');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);

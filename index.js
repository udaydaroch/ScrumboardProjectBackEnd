const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'https://scrumboard-project.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use(userRoutes); // Use userRoutes middleware

app.get('/', (req, res) => {
    res.send('I am here');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);

// index.js
const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
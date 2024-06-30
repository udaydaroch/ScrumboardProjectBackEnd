const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require("./Src/CorsManagement/Cors")
const app = express();

app.use(cors); // Use cors middleware first
app.use(userRoutes); // Then use userRoutes middleware

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
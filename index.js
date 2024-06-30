const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require("./Src/CorsManagement/Cors")
const app = express();

app.use(userRoutes);
app.use(cors);
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);
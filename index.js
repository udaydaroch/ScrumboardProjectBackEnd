const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require("cors")
const app = express();

app.use(cors); // Use cors middleware first
app.use(userRoutes); // Then use userRoutes middleware

app.get('/', (req, res) => {
    res.send('I am here');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);




// Your routes
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

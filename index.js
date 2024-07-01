const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const app = express();



app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('I am here');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);


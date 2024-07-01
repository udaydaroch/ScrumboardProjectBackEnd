const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const cors = require("cors")
const app = express();


const corsOptions = {
    origin: ['https://scrumboard-project-cbsb6q3lj-udaydarochs-projects.vercel.app/',
        "https://scrumboard-project-git-master-udaydarochs-projects.vercel.app/",
        "https://scrumboard-project.vercel.app/"],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('I am here');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);


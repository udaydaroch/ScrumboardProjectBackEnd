const express = require('express');
const userRoutes = require('./Src/Routes/UserRoutes');
const teamRoutes = require('./Src/Routes/TeamRoutes');
const boardRoutes = require('./Src/Routes/ScrumBoardRoutes');
const taskRoutes = require('./Src/Routes/TaskRoutes');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: ['https://scrumboard-project.vercel.app',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','x-authorization']
}));


app.use(express.json());
app.use(userRoutes);
app.use(teamRoutes);
app.use(boardRoutes);
app.use(taskRoutes);

app.get('/', (req, res) => {
    res.send('ScrumBoard API');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
);

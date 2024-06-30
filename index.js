// index.js
import express from 'express';
import bodyParser from 'body-parser';
import {connect, getPool} from "./db";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.get('/api/users', async (req, res) => {
    try {
        const sql = getPool();
        const { rows } = await sql`SELECT * FROM users`;
        res.json(rows);
    } catch (error) {
        Logger.error(`Error querying users: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    Logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    Logger.info(`Server is running on http://localhost:${PORT}`);
});

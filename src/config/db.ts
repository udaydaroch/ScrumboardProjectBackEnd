// config/db.js
import postgres from 'postgres';
import dotenv from 'dotenv';
import Logger from './logger';

dotenv.config();

// tslint:disable-next-line:prefer-const
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

const connect = async () => {
    try {
        await sql`SELECT 1`;
        Logger.info(`Successfully connected to the database`);
    } catch (error) {
        Logger.error(`Error connecting to the database: ${error.message}`);
    }
};

const getPool = () => {
    return sql;
};

export { connect, getPool };

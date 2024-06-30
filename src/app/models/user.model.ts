import { Helper, Parameter, ArrayParameter, SerializableParameter, Fragment } from 'postgres';
import {getPool} from '../../config/db';
import Logger from '../../config/logger';

async function findByEmail(email: string | number | boolean | Date | Uint8Array | Helper<any, any[]> | Parameter<any> | ArrayParameter<readonly any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[]) {
    Logger.info(`Finding user by email: ${email}`);
    const sql = getPool();
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0];
}

async function updateToken(email: string | number | boolean | Date | Uint8Array | Parameter<any> | Helper<any, any[]> | ArrayParameter<readonly any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[], token: string | number | boolean | Date | Uint8Array | Parameter<any> | Helper<any, any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[]) {
    Logger.info(`Updating token for user with email: ${email}`);
    const sql = getPool();
    await sql` UPDATE users SET auth_token = ${token} WHERE email = ${email} `;
}

async function findByAuthToken(authToken: string | number | boolean | Date | Uint8Array | Parameter<any> | Helper<any, any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[]) {
    Logger.info(`Finding user by auth token: ${authToken}`);
    const sql = getPool();
    const rows = await sql`SELECT * FROM users WHERE auth_token = ${authToken}`;
    return rows[0];
}
async function create(userDetails: { email: any; firstName: any; lastName: any; password: any; }) {
    Logger.info("Creating a new user");
    const { email, firstName, lastName, password } = userDetails;
    const sql = getPool();
    const result = await sql`
        INSERT INTO users (email, first_name, last_name, password) VALUES (${email}, ${firstName}, ${lastName}, ${password})  RETURNING id  `;
    return result[0];
}

async function findById(userId: string | number | boolean | Date | Uint8Array | Parameter<any> | Helper<any, any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[]) {
    Logger.info(`Finding user by ID: ${userId}`);
    const sql = getPool();
    const rows = await sql`SELECT * FROM users WHERE id = ${userId}`;
    return rows[0];
}

async function invalidateAuthToken(authToken: string | number | boolean | Date | Uint8Array | Parameter<any> | Helper<any, any[]> | readonly SerializableParameter<never>[] | Fragment | Fragment[]) {
    Logger.info(`Invalidating auth token: ${authToken}`);
    const sql = getPool();
    await sql` UPDATE users SET auth_token = NULL WHERE auth_token = ${authToken} `;
}


async function updateUser(userId: number, updatedDetails: { email: any; firstName: any; lastName: any; password: any; }) {
    Logger.info(`Updating user with ID: ${userId}`);
    const { email, firstName, lastName, password } = updatedDetails;
    const sql = getPool();
    const setClauses = [];
    const values = [];

    if (email) {
        setClauses.push('email = $' + (values.length + 1));
        values.push(email);
    }
    if (firstName) {
        setClauses.push('first_name = $' + (values.length + 1));
        values.push(firstName);
    }
    if (lastName) {
        setClauses.push('last_name = $' + (values.length + 1));
        values.push(lastName);
    }
    if (password) {
        setClauses.push('password = $' + (values.length + 1));
        values.push(password);
    }

    if (setClauses.length === 0) {
        Logger.info(`No details provided to update for user with ID: ${userId}`);
        return;
    }

    const setClause = setClauses.join(', ');
    values.push(userId);

    const query = `UPDATE users SET ${setClause} WHERE id = $${values.length}`;

    await sql.unsafe(query, values);
}


export { findByEmail, create, updateToken, findByAuthToken, invalidateAuthToken, findById, updateUser };

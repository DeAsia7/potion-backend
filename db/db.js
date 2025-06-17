import {drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../schema/schema.js';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DEFAULT,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

})

export const db = drizzle(pool, {schema, mode: "default"})
export const {poison, potion, users } = schema;
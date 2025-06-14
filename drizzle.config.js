import { defineConfig } from 'drizzle-orm/mysql2'
import * as schema from './schema/schema.js'
import 'dotenv/config'

export default defineConfig({
    schema, 
    out: './drizzle/migrations',
    driver: 'mysql2',
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DEFAULT,
        port: process.env.DB_PORT,

    }
})
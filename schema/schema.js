//is the mysql table

import { mysqlTable, int, varchar, decimal, tinyint, datetime  } from "drizzle-orm/mysql-core";
import { effect } from "zod";

export const poison = mysqlTable('poison', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    ingredients: varchar('ingredients', { length: 500 }),
    effect: varchar('effect', { length: 500 }),
    created_at: datetime('created_at').defaultNow(),
})

export const potion = mysqlTable('potion', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    ingredients: varchar('ingredients', { length: 500 }),
    effect: varchar('effect', { length: 500 }),
    image_url: varchar('image_url', { length: 500 }),
})

export const user = mysqlTable('user', {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 50 }),
    password: varchar('password', { length: 255 }),
})

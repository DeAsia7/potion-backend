//is the mysql table

//import { timestamp } from "drizzle-orm/gel-core";
import { mysqlTable, int, varchar, datetime  } from "drizzle-orm/mysql-core";


export const poison = mysqlTable('poison', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }),
    ingredients: varchar('ingredients', { length: 500 }),
    effect: varchar('effect', { length: 500 }),
    created_at: datetime('created_at')
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

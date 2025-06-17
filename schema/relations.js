import {relations} from 'drizzle-orm';
import { poison, potion, user } from './schema.js';

//poison to user
export const poisonRelations = relations(poison, ({ many }) => ({
    users: many('user'),
}));


//potion to user
export const potionRelations = relations(potion, ({ many }) => ({
    users: many('user'),
}));


// user to potion and poison 
export const userRelations = relations('user', ({ one }) => ({
    potion: one (potion, {
        fields: [user.potion_id],
        references: [potion.id],
    }),

    poison: one (poison, {
        fields: [user.poison_id],
        references: [poison.id],
    }),
}));

/*
GET - Fetch data app.get('/items', handler)
POST -  Add data app.post('/items', handler)
PUT - Update app.put('/items/:id', handler)
Patch - changes specific data app.patch('/items/:id', handler)
DELETE - Remove app.delete('/items/:id', handler)
*/

import express from 'express';
import {db, poison} from '../db.js';
import {eq, like, and, gt, desc } from 'drizzle-orm';

const router = express.Router();

// Get all poisons
router.get('/Poison', async ( req, res) => {
    const result = await db.select().from(poison);
    res.json(result);
})

//add poison with ingredients, effects, and name
router.post('/Posion', async (req, res) => {
    const result = await db.insert(poison).values({
      name: 'snial', 
      ingredients: 'swamp fungal pod, purple mountain flower, imp stool', 
      effects: 'paralysis, lingering damage magicka'
    });
    res.json({message: 'Poison added successfully '});
})

//delete poison by id
router.delete('/Poison/:id', async (req, res) => {
    const result = await db.delete(poison).where(eq(poison.id, id));
    res.json({message: 'Poison deleted successfully'});
})
//look up details on posion id 
    

    


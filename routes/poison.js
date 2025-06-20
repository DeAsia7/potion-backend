
/*
GET - Fetch data app.get('/items', handler)
POST -  Add data app.post('/items', handler)
PUT - Update app.put('/items/:id', handler)
Patch - changes specific data app.patch('/items/:id', handler)
DELETE - Remove app.delete('/items/:id', handler)
*/

import express from 'express';
import {db} from '../db/db.js';
import {eq } from 'drizzle-orm';
import  validateBody  from '../middlewares/validateBody.js';
import { poisonSchema } from '../validators/index.js';
import { poison } from '../schema/schema.js';

const router = express.Router();

// Get all poisons
router.get('/allpoison', async ( req, res) => {
    const result = await db.select().from(poison);
  res.json(result);
})

//add poison with ingredients, effects, and name 
//check frontend for req.body
router.post('/addPoison', validateBody(poisonSchema),  async (req, res) => {
    const {name, ingredients, effect} = req.body;
    const result = await db.insert(poison).values({
        name: name, 
        ingredients: ingredients, 
        effect: effect,
        //created_at: new Date()
    });
    res.json({message: 'Poison added successfully '});
    });


//delete poison by id
router.delete('/:id', async (req, res) => {
    const result = await db.delete(poison).where(eq(poison.id, id));
    res.json({message: 'Poison deleted successfully'});
})

// fetch specific poison by id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
    const result = await db.select().from(poison).where(eq(poison.id,id));
        res.status(404).json({message: 'Poison not found'});
    
})

//update poison by id
router.put('/update/:id', validateBody (poisonSchema), async (req, res) => {
   const id = parseInt(req.params.id);
    const {name, ingredients, effect} = req.body;
    const result = await db.update(poison).set({
        name: name, 
        ingredients: ingredients, 
        effect: effect,
        created_at: new Date()
    }).where(eq(poison.id, id));
    res.json({message: 'Poison updated successfully'});
})

export default router;  
    

    


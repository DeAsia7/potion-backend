
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
//check frontend for req.body
router.post('/Poison', async (req, res) => {
    const result = await db.insert(poison).values({
        name: req.body.name, 
        ingredients: req.body.ingredients, 
        effects: req.body.effects
    });
    res.json({message: 'Poison added successfully '});
})

//delete poison by id
router.delete('/Poison/:id', async (req, res) => {
    const result = await db.delete(poison).where(eq(poison.id, id));
    res.json({message: 'Poison deleted successfully'});
})
// fetch specific poison by id
router.get('/Poison/:id', async (req, res) => {
    const result = await db.select().from(poison).where(eq(poison.id, id));
        res.status(404).json({message: 'Poison not found'});
    
})

//update poison by id
router.put(('/update/:id'), async (req, res) => {
    const result = await db.update(poison).set({req.body.name, req.body.ingredient, req.body.effects}).where(eq(poison.id, req.params.id));
    res.json({message: 'Poison updated successfully'});
})
    

    


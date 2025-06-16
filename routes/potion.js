import express from 'express';
import {db, poison} from '../db.js';
import {eq, like, and, gt, desc } from 'drizzle-orm';

const router = express.Router();

// get all potions 
router.get('/Potion', async ( req, res) => {
    const result = await db.select().from(potion);
    res.json(result);
})

// add potion with ingredients, effects, and name
router.post('/Potion', async (req, res) => {
    const result = await db.insert(potion).values({
      name: '', 
      ingredients: '', 
      effects: ''
    });
    res.json({message: 'Potion added successfully '});
})

// delete potion by id
router.delete('/Potion/:id', async (req, res) => {
    const result = await db.delete(potion).where(eq(potion.id, id));
    res.json({message: 'Potion deleted successfully'});
})

// look up details on potion by id
router.get('/Potion/:id', async (req, res) => {
    const result = await db.select().from(potion).where(eq(potion.id, id));
   
})

// update potion by id
router.put('/Potion/:id', async (req, res) => {

})



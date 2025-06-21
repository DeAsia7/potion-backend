import express from 'express';
import {db, potion} from '../db/db.js';
import {eq } from 'drizzle-orm';
import  validateBody  from '../middlewares/validateBody.js';
import { potionSchema } from '../validators/index.js';


const router = express.Router();

// get all potions 
router.get('/allpotions', async ( req, res) => {
    const result = await db.select().from(potion);
    console.log(result)
    res.json(result);
})

// add potion with ingredients, effects, and name
router.post('/add-Potion', validateBody(potionSchema),  async (req, res) => {
    const {name, ingredient, effects} = req.body;
    const result = await db.insert(potion).values({
        name: name, 
        ingredient: ingredient, 
        effects: effects
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
    res.status(404).json({message: 'Potion not found'});
   
})

// update potion by id
router.put('/update/:id', validateBody (potionSchema), async (req, res) => {
    const id = parseInt(req.params.id);
     const {name, ingredient, effects} = req.body;
     const result = await db.update(potion).set({
         name: name, 
         ingredient: ingredient, 
         effects: effects
     }).where(eq(potion.id, id));
     res.json({message: 'Poison updated successfully'});

})
export default router;




/*
GET - Fetch data app.get('/items', handler)
POST -  Add data app.post('/items', handler)
PUT - Update app.put('/items/:id', handler)
Patch - changes specific data app.patch('/items/:id', handler)
DELETE - Remove app.delete('/items/:id', handler)
*/

import express from 'express';
import {db, poison} from '../db/db.js';
import {eq } from 'drizzle-orm';
import  validateBody  from '../middlewares/validateBody.js';
import { poisonSchema } from '../validators/index.js';


import fs from 'fs';
import multer from 'multer'; 
import s3 from '../utils/s3Client.js';

const upload = multer({dest: 'uploads/'});



const router = express.Router();

// Get all poisons
router.get('/allpoison', async ( req, res) => {
    const result = await db.select().from(poison);
  res.json(result);
})

//add poison with ingredients, effects, and name 
//check frontend for req.body
router.post('/add-Poison', validateBody(poisonSchema),  async (req, res) => {
    const {name, ingredients, effect} = req.body;
    const result = await db.insert(poison).values({
        name: name, 
        ingredients: ingredients, 
        effect: effect,
        created_at: new Date()
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
  const {id} = req.params;
  console.log(id);
  //change string into number Number(id),,, my const result (variable) is different from the table name
    const poisons = await db.select().from(poison).where(eq(poison.id, Number(id)));
    if (!poison) return res.status(404).json({message: 'Poison not found'});
    
    res.json ({
        id: poisons[0].id,
        name: poisons[0].name,
        ingredients: poisons[0].ingredients,
        effect: poisons[0].effect,
        created_at: poisons[0].created_at,
        image_url: poisons[0].image_url || null
    })
})

router.post("upload-image/:id", upload.single('image'), async (req, res) => {
    const id = req.params.id;
    const file = req.file;

    if (!file) 
        return res.status(400).json({message: 'No file uploaded'});
    if (id <= 0) return res.status(400).json({message: 'Invalid ID'});

    const fileStream = fs.createReadStream(file.path);
    const Key = `poison/${id}-${file.originalname}`;

    try{
const result = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: Key,
            Body: fileStream,
            ContentType: file.mimetype
        }).promise();

        // Update the poison record with the image URL
        await db.update(poison).set({image_url: result.location})
        .where(eq(poison.id, Number (id)));

    res.json({url: result.Location});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error uploading image to S3'});
    }
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
    

    


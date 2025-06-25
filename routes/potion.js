import express from 'express';
import {db, potion} from '../db/db.js';
import {eq } from 'drizzle-orm';
import  validateBody  from '../middlewares/validateBody.js';
import { potionSchema } from '../validators/index.js';



import fs from 'fs';
import multer from 'multer'; 
import s3 from '../utils/s3Client.js';

const upload = multer({dest: 'uploads/'});

const router = express.Router();

// get all potions 
router.get('/allpotion', async ( req, res) => {
    const result = await db.select().from(potion);
    res.json(result);
})

// add potion with ingredients, effects, and name
router.post('/add-Potion', validateBody(potionSchema), async (req, res) => {
   //const {name, ingredient, effects} = req.body;
    await db.insert(potion).values({
        name: req.body.name, 
        ingredients: req.body.ingredients, 
        effect: req.body.effect,
        created_at: new Date(),
        image_url: req.body.image_url || null
    });
    res.json({message: 'Potion added successfully '});
})

// delete potion by id
router.delete('/Potion/:id', async (req, res) => {
    const result = await db.delete(potion).where(eq(potion.id, id));
    res.json({message: 'Potion deleted successfully'});
})

// look up details on potion by id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
      const potions = await db.select().from(potion).where(eq(potion.id,Number(id)));
      console.log(potion);
      if (!potion) return res.status(404).json({message: 'Potion not found'});
      
      res.json ({
          id: potions[0].id,
          name: potions[0].name,
          ingredients: potions[0].ingredients,
          effect: potions[0].effect,
          created_at: potions[0].created_at,
          image_url: potions[0].image_url || null
      })
  })
  
  router.post("upload-image/:id", upload.single('image'), async (req, res) => {
      const [id] = req.params;
      const file = req.file;
  
      if (!file) 
          return res.status(400).json({message: 'No file uploaded'});
      if (id <= 0) return res.status(400).json({message: 'Invalid ID'});
  
      const fileStream = fs.createReadStream(file.path);
      const Key = `potion/${id}/-${file.originalname}`;
  
      try{
  const result = await s3.upload({
              Bucket: process.env.BUCKET_NAME,
              Key: Key,
              Body: fileStream,
              ContentType: file.mimetype
          }).promise();
  
          // Update the potion record with the image URL
          await db.update(potion).set({image_url: result.location})
          .where(eq(potion.id, id));
  
      res.json({url: result.Location});
  
      } catch (error) {
          console.error(error);
          return res.status(500).json({message: 'Error uploading image to S3'});
      }
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
     res.json({message: 'potion updated successfully'});

})
export default router;



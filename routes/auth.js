import express from 'express';
import jwt from 'jsonwebtoken';
import {db, users} from '../db.js';
import {eq, and} from 'drizzle-orm';

const router = express.Router();

//use routers to connect. 

router.post('/login', async (req, res) => {
const authHeader = req.headers['authorization'];
if (!authHeader || !authHeader.startsWith("Basic")){
    return res.status(401).json({message: 'Missing Basic Authentication Header'});
}
})
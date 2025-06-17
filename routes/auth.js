import express from 'express';
import jwt from 'jsonwebtoken';
import {db} from '../db/db.js';
import {eq, and} from 'drizzle-orm';

const router = express.Router();

//use routers to connect. 
//this is how to login into database on postman
router.post('/login', async (req, res) => {
const authHeader = req.headers['authorization'];
if (!authHeader || !authHeader.startsWith("Basic")){
    return res.status(401).json({message: 'Missing Basic Authentication Header'});
}
const base64Credentials = authHeader.split(' ')[1];
const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
const [username, password] = credentials.split(':');

const user = db.select().from(users).where(and(eq(username, users.username), eq(password, users.password)))
if (!user) {
    return res.status(401).json({message: 'Invalid credentials'});
}

const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
res.json({ token });
})
export default router;

/*
change get to post
copy and paste loclalhost:3000/auth/login
go to authorization tab and select basic auth
enter username and password
you should get a token back
if you get an error, check the console for errors

then you can use this token to access protected routes
make sure to change the post to get and change the endpoint from login to wateva route ur looking for
*/
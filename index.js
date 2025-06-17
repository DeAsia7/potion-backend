import express from 'express';
import PoisonRoutes from './routes/poison.js';
import PotionRoutes from './routes/potion.js';
import authRoutes from './routes/auth.js';
import logger from './middlewares/logger.js';
import verifyToken  from './middlewares/verifyToken.js';
//import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());
app.use(logger);

app.use(authRoutes);

app.use('/Potion', verifyToken, PotionRoutes);
app.use('/' , verifyToken, PoisonRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
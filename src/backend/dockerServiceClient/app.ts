import express, { Request, Response } from 'express';
import userRoutes from './src/routes/userRoutes';
import pokemonRoutes from './src/routes/pokemonRoutes';
import gamificationRoutes from './src/routes/gamificationRoutes';  // Importation des nouvelles routes
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/gamification', gamificationRoutes);  // Utilisation des nouvelles routes
app.get('/health', (_: Request, res: Response) =>
    {
        res.status(200).send('OK');
    });
app.listen(port, () => 
    {
        console.log(`BFF service running on port ${port}`);
    });

export default app;

import express,{ Request, Response } from 'express';
import cors from 'cors';
import {Moongose} from './src/middlewares/databaseEngine/src/mongoose/moongose'
import loginRoutes from './src/routes/UserRoutes'; 
import boutiqueRoutes from './src/routes/BoutiqueRoutes';
import pokemonRoutes from './src/routes/PokemonRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);
app.use('/api/boutique', boutiqueRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.get('/health', (_: Request, res: Response) =>
{
    res.status(200).send('OK');
});
Moongose.ConnectToDatabase().then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)));
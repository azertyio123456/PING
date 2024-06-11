import express,{ Request, Response } from 'express';
import cors from 'cors';
import {Moongose} from './databaseEngine/src/mongoose/moongose'
import loginRoutes from './login/src/routes/login'; 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', loginRoutes);
app.get('/health', (_: Request, res: Response) =>
{
    res.status(200).send('OK');
});
Moongose.ConnectToDatabase().then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)));
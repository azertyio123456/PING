import express,{ Request, Response } from 'express';
import cors from 'cors';
import JiraRoutes from './missionsJira/src/route'; 


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api', JiraRoutes);
app.get('/health', (_: Request, res: Response) =>
{
    res.status(200).send('OK');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
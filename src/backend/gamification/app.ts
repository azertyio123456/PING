import express, { Request, Response } from 'express';
import gamificationRoutes from './src/routes/gamificationRoutes';


const app = express();
const port = 7000;

app.use(express.json());
app.use('/api/gamification', gamificationRoutes);

app.get('/health', (_: Request, res: Response) =>
{
    res.status(200).send('OK');
});

app.listen(port, () =>
{
    console.log(`Gamification service running on port ${port}`);
});

export default app;

import express from 'express';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.listen(port, () => 
    {
        console.log(`BFF service running on port ${port}`);
    });
    
export default app;

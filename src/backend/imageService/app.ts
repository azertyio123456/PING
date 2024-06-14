import express from 'express';
import imageRoutes from './src/routes/imageRoutes';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api', imageRoutes);
app.listen(port, () => 
{
    console.log(`BFF service running on port ${port}`);
});
    
export default app;

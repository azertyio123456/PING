import { Request, Response } from 'express';
import { ImageProcessor } from '../middlewares/InitImageProcessor';
import { SetUserPathImage } from '../services/ImageServices';

export const initNewEmployee = async (req: Request, res: Response) => 
{
    const { email } = req.body;

    try
    {
        let pathCreated : string | undefined = await ImageProcessor.processUserImages(email);
        await SetUserPathImage(email, pathCreated)
        res.status(200).json({ message: "User successfully connected!" });
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

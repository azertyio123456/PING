import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

export const GetAvatar = async (req: Request, res: Response) => 
{
    const { imagePath, level } = req.body;

    try
    {
        const absolutePath = path.resolve(imagePath + '/' + level);
        
        // Check if the file exists
        if (!fs.existsSync(absolutePath))
        {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Send the image file as a response
        res.sendFile(absolutePath, (err: any) => 
        {
            if (err)
            {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending image');
            }
        });
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

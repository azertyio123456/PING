import { Request, Response } from 'express';
import { GetUserDatabase, GetJiraTickets } from '../services/userService';

export const GetUserDashboard = async (req: Request, res: Response) => 
{
    const { email } = req.body;

    if (!email)
    {
        return res.status(400).json({ error: 'Email required' });
    }

    try
    {
        const userInfo = await GetUserDatabase(email);
        const workInfo = await GetJiraTickets(email);

        const aggregatedData = 
        {
            userInfo,
            workInfo
        };

        res.json(aggregatedData);
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

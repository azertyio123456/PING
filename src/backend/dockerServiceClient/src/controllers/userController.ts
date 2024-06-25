import { Request, Response } from 'express';
import { GetUserDatabase, GetJiraTickets, InitUserDB, InitAvatar, GetAllUserFromDB } from '../services/userService';

export const GetUserDashboard = async (req: Request, res: Response) => 
{
    const { email } = req.body;
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
export const InitUser = async (req: Request, res: Response) => 
{
    const {email , username } = req.body;

    if (!email)
    {
        return res.status(400).json({ error: 'Email required' });
    }

    try
    {
        await InitUserDB(email, username);
        await InitAvatar(email);

        res.status(200).json({ message: 'New Employee Initialise' });
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
export const GetUser = async (req: Request, res: Response) => 
{
    const { username } = req.body;
    try
    {
        const userInfo = await GetUserDatabase(username);

        const aggregatedData = 
        {
            userInfo
        };

        res.json(aggregatedData);
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
export const GetAllUser = async (req: Request, res: Response) => 
{
    try
    {
        const userInfo = await GetAllUserFromDB();

        res.json(userInfo);
    }
    catch (error)
    {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
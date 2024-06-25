import { Request, Response } from 'express';
import { fetchLeaderboard, initiateBattle } from '../services/gamificationService';
import { GetUserDatabase, UpdateUserDatabase } from '../services/userService';

export const getLeaderboard = async (req: Request, res: Response) =>
{
    try
    {
        const leaderboard = await fetchLeaderboard();
        res.status(200).json(leaderboard);
    }
    catch (error)
    {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
};

export const runBattle = async (req: Request, res: Response) =>
{
    try
    {
        await initiateBattle();
        res.status(200).json({message: "Battle succeed"});
    }
    catch (error)
    {
        res.status(500).json({ error: 'Failed to run battles' });
    }
};

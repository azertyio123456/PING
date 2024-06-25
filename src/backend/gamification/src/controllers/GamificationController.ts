import { Request, Response } from 'express';
import { UpdateUser, fetchAllUsers, fetchUsers } from '../services/UserServices';
import { BattleLogic } from '../middleware/BattleQuest';

export const initializeLeaderboard = async (req: Request, res: Response) =>
{
    try
    {
        const users = await fetchAllUsers();

        const leaderboard = users.map((user: any) =>
        {
            const victories = user.gamification.victory.filter((v: boolean) => v).length;
            return {
                username: user.username,
                victories: victories
            };
        }).sort((a: any, b: any) => b.victories - a.victories);

        res.status(200).json(leaderboard);
    }
    catch (error)
    {
        res.status(500).json({ error: 'Failed to initialize leaderboard' });
    }
};

export const handleBattleLogic = async (req: Request, res: Response) => 
{
    try
    {
        const battleResults = await BattleLogic.runTournament();
        for (const battle of battleResults)
        {
            const user1 = await fetchUsers(battle.user1);
            const user2 = await fetchUsers(battle.user2);
            
            if (battle.winner === user1.userInfo.username)
            {
                user1.userInfo.gamification.victory.push(true);
                user2.userInfo.gamification.victory.push(false);
            }
            else
            {
                user1.userInfo.gamification.victory.push(false);
                user2.userInfo.gamification.victory.push(true);
            }

            user1.userInfo.battleLog.push({
                date: new Date(),
                logs: battle.battleLog
            });

            user2.userInfo.battleLog.push({
                date: new Date(),
                logs: battle.battleLog
            });

            await UpdateUser(user1.userInfo);
            await UpdateUser(user2.userInfo);
        }
        res.status(200).json(battleResults);
    }
    catch (error)
    {
        console.error(error); // Log the error for debugging
        if (!res.headersSent)
        {
            res.status(500).json({ error: 'Failed to run battles' });
        }
    }
};

export const checkEvolution = async (req: Request, res: Response) => 
{
    // Logique pour vérifier l'évolution des pokémons
};

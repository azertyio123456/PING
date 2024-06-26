import { Request, Response } from 'express';
import { UpdatePokemon, UpdateUser, fetchAllUsers, fetchUserPokemon, fetchUsers } from '../services/UserServices';
import { BattleLogic } from '../middleware/BattleQuest';
import dotenv from 'dotenv';

dotenv.config();
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
            const pokemon1 = await fetchUserPokemon(battle.user1);
            const pokemon2 = await fetchUserPokemon(battle.user2);

            const VICTORY_GAIN_GOLD = parseInt(process.env.VICTORY_GAIN_GOLD || '0', 10);
            const VICTORY_GAIN_EXP = parseInt(process.env.VICTORY_GAIN_EXP || '0', 10);
            const VICTORY_GAIN_LEVEL = parseInt(process.env.VICTORY_GAIN_LEVEL || '0', 10);
            const VICTORY_GAIN_HAPPINESS = parseInt(process.env.VICTORY_GAIN_HAPPINESS || '0', 10);
            const DEFEAT_GAIN_GOLD = parseInt(process.env.DEFEAT_GAIN_GOLD || '0', 10);
            const DEFEAT_GAIN_EXP = parseInt(process.env.DEFEAT_GAIN_EXP || '0', 10);
            const DEFEAT_LOSS_HAPPINESS = parseInt(process.env.DEFEAT_LOSS_HAPPINESS || '0', 10);

            if (battle.winner === user1.userInfo.username)
            {
                user1.userInfo.gamification.victory.push(true);
                user1.userInfo.gamification.gold.push(VICTORY_GAIN_GOLD);
                user1.userInfo.gamification.exp.push(VICTORY_GAIN_EXP);
                pokemon1.userInfo.gamification.level += VICTORY_GAIN_LEVEL; 
                pokemon1.userInfo.gamification.happiness += VICTORY_GAIN_HAPPINESS; 

                user2.userInfo.gamification.victory.push(false);
                user2.userInfo.gamification.gold.push(DEFEAT_GAIN_GOLD);
                user2.userInfo.gamification.exp.push(DEFEAT_GAIN_EXP);
                pokemon2.userInfo.gamification.happiness -= DEFEAT_LOSS_HAPPINESS;
            }
            else
            {
                user2.userInfo.gamification.victory.push(true);
                user2.userInfo.gamification.gold.push(VICTORY_GAIN_GOLD);
                user2.userInfo.gamification.exp.push(VICTORY_GAIN_EXP);
                pokemon2.userInfo.gamification.level += VICTORY_GAIN_LEVEL; 
                pokemon2.userInfo.gamification.happiness += VICTORY_GAIN_HAPPINESS; 

                user1.userInfo.gamification.victory.push(false);
                user1.userInfo.gamification.gold.push(DEFEAT_GAIN_GOLD);
                user1.userInfo.gamification.exp.push(DEFEAT_GAIN_EXP);
                pokemon1.userInfo.gamification.happiness -= DEFEAT_LOSS_HAPPINESS;
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
            await UpdatePokemon(pokemon1.userInfo);
            await UpdatePokemon(pokemon2.userInfo);
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

import { Request, Response } from 'express';
import { GetPokemonDatabase } from '../services/PokemonService';

export const GetPokemon = async (req: Request, res: Response) => 
{
    const { username } = req.body;
    try
    {
        const userInfo = await GetPokemonDatabase(username);

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
import { Request, Response } from 'express';
import { PokemonDB } from '../middlewares/databaseEngine/src/mongoose/PokemonDB';

export const GetPokemon = async (req: Request, res: Response) => 
{
    const { username } = req.body;
    let pokemonDb: PokemonDB = new PokemonDB();
    try
    {
        await pokemonDb.RetrieveByCriteria({ username: username });
        if (pokemonDb.GetDocument()?.length === 0)
        {
            res.status(404).json({ error: "Unknown username!" });
        }
        else
        {
            const pokemonDocument = pokemonDb.GetDocument();

            if (pokemonDocument && pokemonDocument.length > 0)
            {
                res.status(200).json(pokemonDocument[0]);
            }
            else
            {
                res.status(404).json({ error: "Pokemon not found" });
            }
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};

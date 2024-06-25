import { UserDB } from '../middlewares/databaseEngine/src/mongoose/UserDB';
import { Request, Response } from 'express';
import { User } from '../middlewares/databaseEngine/src/object_yourPieces/Users';
import { Pokemon } from '../middlewares/databaseEngine/src/object_yourPieces/Pokemon';
import { PokemonDB } from '../middlewares/databaseEngine/src/mongoose/PokemonDB';

export const Login = async (req: Request, res: Response) => 
{
    const { username } = req.body;
    console.log(username);
    let userDb: UserDB = new UserDB();
    try
    {
        await userDb.RetrieveByCriteria({ username: username });
        if (userDb.GetDocument()?.length === 0)
        {
            res.status(404).json({ error: "Unknown Username!" });
        }
        else
        {
            if (username === userDb.GetUsername(0))
            {
                const userDocument = userDb.GetDocument();

                if (userDocument && userDocument.length > 0)
                {
                    res.status(200).json(userDocument[0]);
                }
                await userDb.Update();
            }
            else
            {
                res.status(401).json({ error: "Username Do not exists" });
            }
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};
export const RetrieveAll = async (_: Request, res: Response) => 
{
    let userDb: UserDB = new UserDB();
    try
    {
        await userDb.RetrieveAll();
        if (userDb.GetDocument()?.length === 0)
        {
            res.status(404).json({ error: "No player found !" });
        }
        res.status(200).json(userDb.GetDocument());
        userDb.Free();
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};
    
export const Register = async (req: Request, res: Response) =>
    {
        const { email, username } = req.body;
        let userDb: UserDB = new UserDB();
        const savedPokemon = new PokemonDB();
        try
        {
            const userData =
            {
                username: username,
                email: email,
                gamification:
                {
                    competence: [],
                    gold: [],
                    exp: [],
                    evolution_id: 0,
                    path_image: "",
                    lines_written: [],
                    errors: [],
                    victory: []
                },
                battleLog: []
            };
    
            const pokemonData =
            {
                username: 'PikachuTrainer',
                gamification:
                {
                    competences:
                    {
                        name: 'Thunderbolt',
                        attack: 90,
                        random: 10
                    },
                    level: 5,
                    evolutionLevel: 2,
                    hp: 35,
                    attack: 55,
                    happiness: 75
                }
            };
    
            const user = new User(
                userData.username,
                userData.email,
                userData.gamification,
                userData.battleLog
            );
    
            const pokemon = new Pokemon(
                userData.username,
                pokemonData.gamification
            );
    
            await userDb.SaveNewInstance(user.ToIUser());
            await savedPokemon.SaveNewInstance(pokemon.ToIPokemon());
    
            res.status(200).json({ message: "User successfully registered !" });
        }
        catch (error)
        {
            res.status(500).json({ error: "Internal server error." });
        }
    };

export const SetImage = async (req: Request, res: Response) => 
{
    const { email, path } = req.body;
    let userDb: UserDB = new UserDB();
    try
    {
        await userDb.RetrieveByCriteria({ email: email });
        if (userDb.GetDocument()?.length === 0)
        {
            res.status(404).json({ error: "Unknown Username!" });
        }
        else
        {
            if (email === userDb.GetEmail(0))
            {
                userDb.SetPathImages(path, 0);
                res.status(200).json({ message: "User successfully connected!" });
                await userDb.Update();
            }
            else
            {
                res.status(401).json({ error: "Username Do not exists" });
            }
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};

export const UpdateUserFromJSON = async (req: Request, res: Response) =>
{
    const { email, gamification, battleLog } = req.body;
    let userDb: UserDB = new UserDB();

    try
    {
        await userDb.RetrieveByCriteria({ email: email });
        if (userDb.GetDocument()?.length === 0)
        {
            res.status(404).json({ error: "Unknown User!" });
        } 
        else
        {
            if (email === userDb.GetEmail(0))
            {
                console.log(email);
                console.log(gamification);
                console.log(battleLog[0]);
                userDb.SetGamification(gamification, 0);
                userDb.SetBattleLog(battleLog, 0);
                await userDb.Update();
                res.status(200).json({ message: "User successfully updated!" });
            } 
            else
            {
                res.status(401).json({ error: "Email does not match any user" });
            }
        }
    } 
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};
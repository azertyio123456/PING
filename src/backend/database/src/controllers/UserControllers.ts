import { UserDB } from '../middlewares/databaseEngine/src/mongoose/UserDB';
import { Request, Response } from 'express';
import { User } from '../middlewares/databaseEngine/src/object_yourPieces/Users';

export const Login = async (req: Request, res: Response) => 
{
    const { username } = req.body;
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

export const Register = async (req: Request, res: Response) => 
{
    const { email, username } = req.body;
    let userDb: UserDB = new UserDB();
    try
    {
        const userData = {
            username: username,
            email: email,
            gamification: {
              competence: [],
              gold: 0,
              exp: 0,
              evolution_id: 0,
              path_image: ""
            }
          };
          const user = new User(
            userData.username,
            userData.email,
            userData.gamification
          );
        await userDb.SaveNewInstance(user.ToIUser());
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
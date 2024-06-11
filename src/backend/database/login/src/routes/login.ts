import { Router } from 'express';
import { UserDB } from './../../../databaseEngine/src/mongoose/UserDB';

const router = Router();

router.post('/login', async (req, res) =>
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
});

export default router;

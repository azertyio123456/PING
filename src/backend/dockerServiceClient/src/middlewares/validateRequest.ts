import { Request, Response, NextFunction } from 'express';

export const validateRequestGetUser = (req: Request, res: Response, next: NextFunction) => 
{
    const { username } = req.body;
    if (!username)
    {
        return res.status(400).json({ error: 'Username required' });
    }
    next();
};
export const validateRequest = (req: Request, res: Response, next: NextFunction) => 
    {
        const { email } = req.body;
        if (!email)
        {
            return res.status(400).json({ error: 'Email required' });
        }
        next();
    };
export const validateRequestInit = (req: Request, res: Response, next: NextFunction) => 
{
    const { email, username } = req.body;
    if (!email || !username)
    {
        return res.status(400).json({ error: 'Email && username required' });
    }
    next();
};
export const validateRequestGetPokemon = (req: Request, res: Response, next: NextFunction) => 
{
    const { username } = req.body;
    if (!username)
    {
        return res.status(400).json({ error: 'username required' });
    }
    next();
};
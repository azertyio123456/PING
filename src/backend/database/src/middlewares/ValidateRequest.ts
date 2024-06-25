import { Request, Response, NextFunction } from 'express';

export const validateRequestRegister = (req: Request, res: Response, next: NextFunction) => 
{
    const { email, username} = req.body;
    if (!email || !username)
    {
        return res.status(400).json({ error: 'email and username is required to find images' });
    }
    next();
};
export const validateRequestLogin = (req: Request, res: Response, next: NextFunction) => 
{
    const { username } = req.body;
    if (!username)
    {
        return res.status(400).json({ error: 'email is required to login' });
    }
    next();
};
export const validateRequestSetImage = (req: Request, res: Response, next: NextFunction) => 
{
    const { path, email } = req.body;
    if (!path || !email)
    {
        return res.status(400).json({ error: 'email && path is required to setImage path' });
    }
    next();
};
export const validateRequestUpdateUser = (req: Request, res: Response, next: NextFunction) => 
{
    const { email, gamification } = req.body;
    if (!email || !gamification)
    {
        return res.status(400).json({ error: 'email and gamification data are required to update user' });
    }
    next();
};
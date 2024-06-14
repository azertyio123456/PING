import { Request, Response, NextFunction } from 'express';

export const validateRequestGetAvatar = (req: Request, res: Response, next: NextFunction) => 
{
    const { path, level} = req.body;
    if (!path || !level)
    {
        return res.status(400).json({ error: 'path and level is required to find images' });
    }
    next();
};
export const validateRequestInit = (req: Request, res: Response, next: NextFunction) => 
{
    const { email } = req.body;
    if (!email)
    {
        return res.status(400).json({ error: 'email is required to init a new employee' });
    }
    next();
};
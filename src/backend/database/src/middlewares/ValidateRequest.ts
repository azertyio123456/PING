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
    const { email } = req.body;
    if (!email)
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
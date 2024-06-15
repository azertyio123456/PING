import { Request, Response } from 'express';
import { BoutiqueDB } from '../middlewares/databaseEngine/src/mongoose/BoutiqueDB';

export const GetBoutiqueItems = async (req: Request, res: Response) => 
{
    let boutiqueDb: BoutiqueDB = new BoutiqueDB();
    try
    {
        await boutiqueDb.RetrieveAll();
        const items = boutiqueDb.GetDocument();

        if (items?.length === 0)
        {
            res.status(404).json({ error: "No items found in the boutique!" });
        }
        else
        {
            res.status(200).json(items);
        }
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
};

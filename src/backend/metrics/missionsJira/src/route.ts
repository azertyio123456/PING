import { Router } from 'express';
import { JiraActionFactory } from './ticketResponse/ticketFactory';
import { JiraStatus } from './ticketResponse/JiraStatus';
const router = Router();

router.post('/missions', async (req, res) =>
{
    const { user } = req.body;
    try
    {
        const action = JiraActionFactory.createAction(JiraStatus.ALL);
        const issues = await action.execute(user);
        console.log('All Issues:', issues);
        res.status(200).json(issues);
    }
    catch (error)
    {
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;

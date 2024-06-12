import { Router } from 'express';
import { GetUserDashboard } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.post('/user-dashboard', validateRequest, GetUserDashboard);

export default router;

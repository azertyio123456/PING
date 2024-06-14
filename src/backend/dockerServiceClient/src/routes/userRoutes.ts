import { Router } from 'express';
import { GetUserDashboard, InitUser } from '../controllers/userController';
import { validateRequest, validateRequestInit } from '../middlewares/validateRequest';

const router = Router();

router.post('/user-dashboard', validateRequest, GetUserDashboard);
router.post('/init', validateRequestInit, InitUser);

export default router;

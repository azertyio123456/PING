import { Router } from 'express';
import { GetAllUser, GetUser, GetUserDashboard, InitUser } from '../controllers/userController';
import { validateRequest, validateRequestGetUser, validateRequestInit } from '../middlewares/validateRequest';

const router = Router();

router.post('/user-dashboard', validateRequest, GetUserDashboard);
router.post('/init', validateRequestInit, InitUser);
router.post('/get', validateRequestGetUser, GetUser);
router.post('/getAll', GetAllUser);

export default router;

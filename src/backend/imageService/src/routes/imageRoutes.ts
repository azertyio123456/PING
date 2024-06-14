import { Router } from 'express';
import { initNewEmployee } from '../controllers/EmployeeControllers';
import { GetAvatar } from '../controllers/ImageControllers';
import { validateRequestGetAvatar, validateRequestInit } from '../middlewares/ValidateRequest';

const router = Router();

router.post('/get', validateRequestGetAvatar, GetAvatar);
router.post('/init', validateRequestInit, initNewEmployee);

export default router;

import { Router } from 'express';
import { Login, Register, SetImage } from '../controllers/UserControllers';
import { validateRequestLogin, validateRequestRegister, validateRequestSetImage } from '../middlewares/ValidateRequest';

const router = Router();

router.post('/login', validateRequestLogin, Login);
router.post('/register', validateRequestRegister, Register);
router.post('/setimagepath', validateRequestSetImage, SetImage)
export default router;

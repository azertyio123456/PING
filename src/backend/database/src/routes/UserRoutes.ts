import { Router } from 'express';
import { Login, Register, SetImage, UpdateUserFromJSON } from '../controllers/UserControllers';
import { validateRequestLogin, validateRequestRegister, validateRequestSetImage, validateRequestUpdateUser } from '../middlewares/ValidateRequest';

const router = Router();

router.post('/login', validateRequestLogin, Login);
router.post('/register', validateRequestRegister, Register);
router.post('/setimagepath', validateRequestSetImage, SetImage)
router.post('/updateuser', validateRequestUpdateUser, UpdateUserFromJSON);
export default router;

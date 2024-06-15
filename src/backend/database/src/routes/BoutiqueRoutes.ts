import { Router } from 'express';
import { GetBoutiqueItems } from '../controllers/BoutiqueControllers';

const router = Router();

router.get('/items', GetBoutiqueItems);

export default router;

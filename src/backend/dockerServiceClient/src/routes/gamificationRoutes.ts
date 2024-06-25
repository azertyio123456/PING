// src/routes/gamificationRoutes.ts
import { Router } from 'express';
import { getLeaderboard, runBattle } from '../controllers/gamificationControllers';

const router = Router();

router.post('/leaderboard', getLeaderboard);
router.post('/battle', runBattle);

export default router;

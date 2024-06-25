import { Router } from 'express';
import { initializeLeaderboard, handleBattleLogic, checkEvolution } from './../controllers/GamificationController';

const router = Router();

router.post('/leaderboard', initializeLeaderboard);
router.post('/battle', handleBattleLogic);
router.post('/check-evolution', checkEvolution);

export default router;

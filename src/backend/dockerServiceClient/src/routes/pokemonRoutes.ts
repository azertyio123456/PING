import { Router } from 'express';
import {  validateRequestGetPokemon } from '../middlewares/validateRequest';
import { GetPokemon } from '../controllers/PokemonController';

const router = Router();
router.post('/get', validateRequestGetPokemon, GetPokemon);
export default router;

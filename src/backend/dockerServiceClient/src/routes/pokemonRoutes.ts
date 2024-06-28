import { Router } from 'express';
import {  validateRequestGetPokemon } from '../middlewares/validateRequest';
import { GetPokemon, UpdatePokemon } from '../controllers/PokemonController';

const router = Router();
router.post('/get', validateRequestGetPokemon, GetPokemon);
router.post('/update', validateRequestGetPokemon, UpdatePokemon);
export default router;

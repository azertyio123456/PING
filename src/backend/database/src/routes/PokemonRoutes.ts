import { Router } from 'express';
import { GetPokemon, UpdatePokemon } from '../controllers/PokemonController';

const router = Router();

router.post('/get', GetPokemon);
router.post('/update', UpdatePokemon);

export default router;

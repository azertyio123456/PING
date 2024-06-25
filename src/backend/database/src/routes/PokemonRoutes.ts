import { Router } from 'express';
import { GetPokemon } from '../controllers/PokemonController';

const router = Router();

router.post('/get', GetPokemon);

export default router;

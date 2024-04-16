import { Router } from 'express';
import { GetRutas, GetSiguienteCiudad } from '../controllers/rutas.js';
const router = Router();

router.get('/getRutas', GetRutas);
router.get('/getSiguienteCiudad', GetSiguienteCiudad);
 
export default router;
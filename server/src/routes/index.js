import { Router } from 'express';
import { GetRutas, GetSiguienteCiudad, GetCiudades } from '../controllers/rutas.js';
const router = Router();

router.get('/getRutas', GetRutas);
router.get('/getCiudades', GetCiudades);
router.get('/getSiguienteCiudad', GetSiguienteCiudad);
 
export default router;
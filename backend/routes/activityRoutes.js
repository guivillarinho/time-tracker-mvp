import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import { createActivity } from '../controllers/activityController.js';

// @route   POST api/activities
// @desc    Criar uma nova atividade de registro de tempo
// @access  Private (Requer Token JWT)
router.post('/', auth, createActivity);

// *Outras rotas (GET, PUT, DELETE) serão adicionadas nas próximas etapas*

export default router;

// backend/routes/authRoutes.js
import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController.js';

// Rota POST /api/auth/register
// Desc: Registra um novo usuário
router.post('/register', register);

// Rota POST /api/auth/login
// Desc: Autentica o usuário e retorna o token JWT
router.post('/login', login);

export default router;
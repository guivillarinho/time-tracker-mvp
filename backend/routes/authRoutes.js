// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota POST /api/auth/register
// Desc: Registra um novo usuário
router.post('/register', authController.register);

// Rota POST /api/auth/login
// Desc: Autentica o usuário e retorna o token JWT
router.post('/login', authController.login);

module.exports = router;
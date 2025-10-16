const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const activityController = require('../controllers/activityController');

// @route   POST api/activities
// @desc    Criar uma nova atividade de registro de tempo
// @access  Private (Requer Token JWT)
router.post('/', auth, activityController.createActivity);

// *Outras rotas (GET, PUT, DELETE) serão adicionadas nas próximas etapas*

module.exports = router;

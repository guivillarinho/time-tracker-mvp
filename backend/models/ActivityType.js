// backend/models/ActivityType.js
const mongoose = require('mongoose');

const ActivityTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, default: '#007bff' }, // Para visualização no gráfico
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Para permitir tipos por usuário
});

module.exports = mongoose.model('ActivityType', ActivityTypeSchema);
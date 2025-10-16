const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    // Referência ao usuário que criou a atividade (Obrigatório)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Referência ao tipo de atividade (Obrigatório para filtros/gráficos)
    activityType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActivityType',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    // Horário de Início do registro (Obrigatório)
    startTime: {
        type: Date,
        required: true,
    },
    // Horário de Término do registro (Obrigatório)
    endTime: {
        type: Date,
        required: true,
    },
    // Duração calculada em minutos (pode ser calculado no backend/frontend, mas é bom armazenar)
    durationMinutes: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Activity', ActivitySchema);

// backend/models/ActivityType.js
import { Schema, model } from 'mongoose';

const ActivityTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, default: '#007bff' }, // Para visualização no gráfico
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Para permitir tipos por usuário
});

export default model('ActivityType', ActivityTypeSchema);
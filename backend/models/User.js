// backend/models/User.js
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Armazenará o hash da senha
    createdAt: { type: Date, default: Date.now },
});

export default model('User', UserSchema);
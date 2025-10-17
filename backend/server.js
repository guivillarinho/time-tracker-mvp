// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(json());

// Conexão com o MongoDB
connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

// Rotas
app.get('/', (req, res) => {
    res.send('API de Registro de Atividades funcionando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

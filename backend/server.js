// backend/server.js
require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(json()); // Permite ler JSON no corpo da requisição
app.use(cors());         // Permite o frontend (em outra porta) se conectar

// 1. Conexão com o Banco de Dados (Passo 4)
connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

// Rotas de Teste
app.get('/', (req, res) => {
    res.send('API de Registro de Atividades funcionando!');
});

// 2. Rotas de Autenticação (A ser implementado no passo 5)
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// Rotas:
app.get('/', (req, res) => {
    res.send('API de Registro de Atividades funcionando!');
});

// ** ADICIONE AQUI AS ROTAS DE AUTENTICAÇÃO **
// Rotas de Autenticação
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Rotas de Atividades (AGORA PROTEGIDAS)
import activityRoutes from './routes/activityRoutes.js';
app.use('/api/activities', activityRoutes); // Use o middleware 'auth' dentro do router

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
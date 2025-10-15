// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // Permite ler JSON no corpo da requisição
app.use(cors());         // Permite o frontend (em outra porta) se conectar

// 1. Conexão com o Banco de Dados (Passo 4)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

// Rotas de Teste
app.get('/', (req, res) => {
    res.send('API de Registro de Atividades funcionando!');
});

// 2. Rotas de Autenticação (A ser implementado no passo 5)
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
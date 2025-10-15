// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ------------------------------------
// Função de Registro
// ------------------------------------
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Verificar se o usuário já existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        // 2. Criar nova instância de usuário
        user = new User({
            name,
            email,
            password,
        });

        // 3. Hashear a Senha
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Salvar no Banco de Dados
        await user.save();

        // 5. Gerar e retornar JWT (Token de Autenticação)
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' }, // Token expira em 5 horas
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
};

// ------------------------------------
// Função de Login
// ------------------------------------
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar se o usuário existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // 2. Comparar a Senha fornecida com o hash no DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // 3. Gerar e retornar JWT (Token de Autenticação)
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
};
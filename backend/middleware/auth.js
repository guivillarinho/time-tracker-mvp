import jwt from 'jsonwebtoken';
const { verify } = jwt;

// Middleware para verificar o token JWT em requisições
export default function (req, res, next) {
    // Obter o token do header da requisição
    const token = req.header('x-auth-token');

    // Checar se o token não existe
    if (!token) {
        return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
    }

    // Verificar o token
    try {
        // Decodifica o token usando a chave secreta do .env
        const decoded = verify(token, process.env.JWT_SECRET);

        // Adiciona o usuário decodificado ao objeto de requisição (req.user)
        req.user = decoded.user;
        next(); // Continua para a próxima função da rota
    } catch (err) {
        res.status(401).json({ msg: 'Token não é válido' });
    }
};

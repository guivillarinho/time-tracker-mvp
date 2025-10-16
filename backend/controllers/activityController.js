const Activity = require('../models/Activity');
const ActivityType = require('../models/ActivityType');

// ------------------------------------
// Rota POST /api/activities
// Desc: Cria uma nova entrada de atividade
// Acesso: Privado (Requer JWT)
// ------------------------------------
exports.createActivity = async (req, res) => {
    const { title, description, startTime, endTime, activityTypeName } = req.body;

    try {
        // 1. Verificação básica de dados
        if (!title || !startTime || !endTime || !activityTypeName) {
            return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios: título, início, fim e tipo.' });
        }

        // Calcular duração em minutos
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (end <= start) {
            return res.status(400).json({ msg: 'O horário de término deve ser posterior ao horário de início.' });
        }

        const durationMilliseconds = end.getTime() - start.getTime();
        const durationMinutes = Math.round(durationMilliseconds / 60000); // 60000 ms em 1 minuto

        // 2. Encontrar ou criar o Tipo de Atividade (simplificação para MVP)
        // No MVP, vamos permitir que o usuário envie o NOME do tipo.
        let activityType = await ActivityType.findOne({
            name: activityTypeName,
            user: req.user.id // Traz apenas o tipo criado pelo usuário (ou compartilhado globalmente, se implementado)
        });

        // Se o tipo não existir, cria um novo (simplificando a gestão de tipos)
        if (!activityType) {
            activityType = new ActivityType({
                name: activityTypeName,
                user: req.user.id,
                color: '#808080' // Cor padrão para novos tipos
            });
            await activityType.save();
        }


        // 3. Criar e salvar a nova atividade
        const newActivity = new Activity({
            user: req.user.id, // O ID do usuário vem do JWT no middleware
            activityType: activityType._id,
            title,
            description,
            startTime: start,
            endTime: end,
            durationMinutes,
        });

        const activity = await newActivity.save();

        // Popula o campo activityType para retornar dados úteis ao frontend
        await activity.populate('activityType', 'name color');

        res.json(activity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor ao criar atividade.');
    }
};

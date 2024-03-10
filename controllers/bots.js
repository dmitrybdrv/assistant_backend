const prisma = require('../prisma/prisma-client')

/**
 * @route GET /api/bot
 * @desc Получение всех ботов
 * @Access Private
 */
const all = async (req, res) => {

    try {
        const userId = req.user.id
        const userBots = await prisma.prisma.reviewerBot.findMany({
            where: {
                userId: userId,
            },
        })
        res.status(200).json(userBots)

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось получить настроенных ботов'
        })
    }

}

/**
 * @route POST /api/bot/add
 * @desc Создание бота
 * @Access Private
 */
const createBot = async (req, res) => {

    try {
        const data = req.body

        if (!data.botName || !data.answerRule) {
            return res.status(400).json({message: 'Заполните все поля'})
        }

        const bot = await prisma.prisma.reviewerBot.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(200).json({bot, message: 'Бот создан!'})

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось создать бота'
        })
    }

}

/**
 * @route POST /api/bot/remove
 * @desc Удаление бота
 * @Access Private
 */
const deleteBot = async (req, res) => {
    try {
        const botId = req.params.id;

        const deletedBot = await prisma.prisma.reviewerBot.delete({
            where: {
                id: botId,
            },
        });

        if (deletedBot) {
            res.status(200).json({ message: 'Бот удалён!' });
        } else {
            res.status(404).json({ message: 'Бот не найден' });
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось удалить бота',
            error: e.message,
        });
    }
}



/**
 * @route GET /api/bot/:id
 * @desc Получение одного бота
 * @Access Private
 */
const botById = async (req, res) => {

    try {

        const bot = await prisma.prisma.reviewerBot.findFirst(
            res.status(200).json(prisma.prisma.reviewerBot)
        )

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось получить бота'
        })
    }

}



module.exports = {all, botById, createBot, deleteBot}
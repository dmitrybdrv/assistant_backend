const prisma = require('../prisma/prisma-client')

/**
 * @route GET /api/bot
 * @desc Получение всех ботов
 * @Access Private
 */
const getAllBots = async (req, res) => {

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
        const {id} = req.body;

        const deletedBot = await prisma.prisma.reviewerBot.delete({
            where: {
                id,
            },
        });

        if (deletedBot) {
            res.status(200).json({message: 'Бот удалён!'});
        } else {
            res.status(404).json({message: 'Бот не найден'});
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
 * @route PUT /api/bot/edit
 * @desc Редактирование бота
 * @Access Private
 */
const editBot = async (req, res) => {

    try {
        const data = req.body

        const bot = await prisma.prisma.reviewerBot.update({
            where: {
                id: data.id,
            },
            data: {
                ...data,
            }
        })

        return res.status(200).json({bot, message: 'Отредактировано!'})

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось изменить'
        })
    }

}


/**
 * @route GET /api/bot/:id
 * @desc Получение одного бота
 * @Access Private
 */
const botById = async (req, res) => {

    const {id} = req.params

    try {

        const bot = await prisma.prisma.reviewerBot.findUnique({
            where: {
                id
            }
        })

        res.status(200).json({bot, message: 'Бот найден'})

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось найти бота'
        })
    }

}


module.exports = {getAllBots, createBot, deleteBot, editBot, botById }
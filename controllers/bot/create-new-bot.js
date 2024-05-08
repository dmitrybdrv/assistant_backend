const prisma = require('../../prisma/prisma-client')

/**
 * @route POST /api/bot/add
 * @desc Создание бота
 * @Access Private
 */
const createBot = async (req, res) => {

    try {
        const data = req.body

        if (!data.botName || !data.botPromtPreset) {
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

module.exports = {createBot}
const prisma = require('../../prisma/prisma-client')


/**
 * @route GET /api/bot/:id
 * @desc Получение одного бота
 * @Access Private
 */
const getBotById = async (req, res) => {

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


module.exports = {getBotById}
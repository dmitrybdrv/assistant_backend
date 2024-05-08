const prisma = require('../../prisma/prisma-client')

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
        console.log(userBots)
        res.status(200).json(userBots)

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось получить настроенных ботов'
        })
    }

}

module.exports = {getAllBots}
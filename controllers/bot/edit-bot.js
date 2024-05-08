const prisma = require('../../prisma/prisma-client')

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

module.exports = {editBot}
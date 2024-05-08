const prisma = require('../../prisma/prisma-client')



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

module.exports = {deleteBot}
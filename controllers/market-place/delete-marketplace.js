const prisma = require('../../prisma/prisma-client')

/**
 * @route DELETE /api/users/remove/:id
 * @desc Удаление Маркетплейса
 * @Access Private
 */
const deleteMarketplace = async (req, res) => {
    try {
        const {id} = req.body;

        const marketplace = await prisma.prisma.marketPlace.findFirst({
            where: {
                id
            }
        })

        // Если ни одного маркетплеса по заданному Id не удалось найти (вернулся null)
        if (!marketplace) {
            return res.status(400).json({message: 'Не удалось удалить Маркетплейс'});
        }

        await prisma.prisma.marketPlace.delete({
            where: {
                id,
                // админ может удалять только своего пользователя по id
                companyId: req.company.id
            },
        });

        if (marketplace) {
            res.status(200).json({message: 'Маркетплейс удалён!'});
        }

    } catch (e) {
        return res.status(500).json({message: 'Что-то не так на бэке'});
    }
}

module.exports = {deleteMarketplace}
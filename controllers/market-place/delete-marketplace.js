const prisma = require('../../prisma/prisma-client')

/**
 * @route DELETE /api/users/remove/:id
 * @desc Удаление Маркетплейса
 * @Access Private
 */
const deleteMarketplace = async (req, res) => {
    try {
        const marketPlaceId = req.params.id;

        const marketplace = await prisma.prisma.marketPlace.findFirst({
            where: {
                id: marketPlaceId
            }
        })

        // Если ни одного маркетплеса по заданному Id не удалось найти (вернулся null)
        if (!marketplace) {
            return res.status(400).json({message: 'Не удалось удалить Маркетплейс'});
        }

        await prisma.prisma.marketPlace.delete({
            where: {
                id: marketPlaceId,
                // админ может удалять только своего пользователя по id
                companyId: req.company.id
            },
        });

        if (marketplace) {
            res.status(200).json({message: 'Маркетплейс удалён!'});
        }

    } catch (e) {
        console.error('Ошибка при удалении маркетплейса:', e) // Логирование ошибки для отладки
        return res.status(500).json({message: 'Что-то пошло не так'});
    }
}

module.exports = {deleteMarketplace}
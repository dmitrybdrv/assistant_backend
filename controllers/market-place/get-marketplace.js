const prisma = require('../../prisma/prisma-client')

/**
 * @route GET /api/marketplaces/find/:id
 * @desc Получение одного маркетплейса - площадки
 * @Access Private
 */

const getMarketplaceById = async (req, res) => {

    const {id} = req.body

    try {

        // Если ID не указан вообще
        if (!id) {
            return res.status(400).json({message: 'Требуется ID маркетплейса'});
        }

        const marketplace = await prisma.prisma.marketPlace.findFirst({
            where: {
                id,
                // админ может получать только свои маркетплейсы
                companyId: req.company.id
            }
        })

        // Если ни одного маркетплеса по заданному Id не удалось найти (вернулся null)
        if (!marketplace) {
            return res.status(400).json({message: 'Маркетплейс не найден'});
        }

        res.status(200).json(marketplace)

    } catch (e) {
        console.error('Ошибка при получении маркептплейса:', e) // Логирование ошибки для отладки
        return res.status(400).json({ message: 'Что-то пошло не так'})
    }

}

module.exports = {getMarketplaceById}
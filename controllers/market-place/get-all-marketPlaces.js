const prisma = require('../../prisma/prisma-client')

/**
 * @route GET /api/marketplaces/all
 * @desc Получение всех маркетплейсов
 * @Access Private
 */
const getAllMarketPlaces = async (req, res) => {

    try {
        // Массив Маркетплейсов (либо пустой, либо с маркетплейсами, которые принадлежат конкретной компании)
        const marketPlaces = await prisma.prisma.marketPlace.findMany({
            where: {
                companyId: req.company.id
            }
        })

        res.status(200).json(marketPlaces)

    } catch (e) {
        res.status(400).json({
            message: 'Что-то не так на бэке'
        })
    }

}

module.exports = {getAllMarketPlaces}
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
        console.error('Ошибка при Получении всех маркетплейсов:', e) // Логирование ошибки для отладки
        res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {getAllMarketPlaces}
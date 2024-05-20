const prisma = require('../../prisma/prisma-client')

/**
 * @route GET /api/promt/get-marketplace-global-promt
 * @desc Получение Глобального Промта Маркетплейса
 * @Access Private
 */

const getMarketPlaceGlobalPromt = async (req, res) => {

    try {
        const {companyId} = req.body
        // Объект marketPlaceGlobalPromt (либо пустой объект который принадлежит конкретной компании и конкретному пользователю)
        const promt = await prisma.prisma.marketPlace.findFirst({
            where: {
                companyId
            },
        })

        // Если не удалось найти ранее создаваемый промт
        if (!promt) {
            res.status(400).json({message: 'Промт Маркетплейса не найден!'})
        }

        res.status(200).json(promt)

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось получить Глобальный промт Маркетплейса'
        })
    }

}

module.exports = {getMarketPlaceGlobalPromt}
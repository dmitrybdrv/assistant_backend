const prisma = require('../../prisma/prisma-client')

/**
 * Создание нового MarketplaceGlobalPromt
 * @route POST /api/promt/create-marketplace-global-promt
 * @Access Private
 */

const createMarketplaceGlobalPromt = async (req, res) => {

    try {

        const {value, name} = req.body

        // Условие - на количество символов
        if (value.length > 1000) {
           return res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        }

        // Создание Глобального промта Маркетплейса (первоначальное создание)
        const newPromt = await prisma.prisma.marketPlace.create({
            data: {
                companyId: req.company.id,
                marketPlaceGlobalPromt: value,
                name
            },
        })

        res.status(200).json({newPromt, message: 'Промт Маркетплейса готов!'})

    } catch (e) {
        console.error('Ошибка при создании промта маркетплейса:', e) // Логирование ошибки для отладки
        return res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {createMarketplaceGlobalPromt}
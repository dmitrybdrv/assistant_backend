const prisma = require('../../prisma/prisma-client')

/**
 * Создание нового MarketplaceGlobalPromt
 * @route POST /api/promt/create-marketplace-global-promt
 * @Access Private
 */

const createMarketplaceGlobalPromt = async (req, res) => {

    try {

        const {value} = req.body

        // TODO нужно ли данное ограничение - условие - на отсутствие введёного промта
        // if (value.length <= 0) {
        //     res.status(400).json({message: 'Промт обязятелен к заполнению'})
        // }

        // Условие - на количество символов
        if (value.length > 1000) {
           return res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        }

        // Создание Глобального промта Маркетплейса (первоначальное создание)
        const newPromt = await prisma.prisma.marketPlace.create({
            where: {
              id: req.company.id
            },
            data: {
                marketPlaceGlobalPromt: value
            }
        })

        res.status(200).json({newPromt, message: 'Промт Маркетплейса готов!'})

    } catch (e) {
        return res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createMarketplaceGlobalPromt}
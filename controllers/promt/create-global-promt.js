const prisma = require('../../prisma/prisma-client')

/**
 * Создание нового GlobalPromt
 * @route PUT /api/promt/create-global-promt
 * @Access Private
 */

const createGlobalPromt = async (req, res) => {

    try {

        const {value} = req.body

        // TODO нужно ли данное ограничение - условие - на отсутствие введёного промта
        // if (value.length <= 0) {
        //     res.status(400).json({message: 'Промт обязятелен к заполнению'})
        // }
        // условие - на количество символов

        if (value.length > 1000) {
           return res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        }

        // Изменение Глобального промта администратора - Company (первоначальное создание происходит в момент создания Company - админа)
        const newPromt = await prisma.prisma.globalPromt.update({
            where: {
                companyId: req.company.id // req.company.id - админский id (расшифрованный)
            },
            data: {
                value,
            }
        })

        res.status(200).json({newPromt, message: 'Промт готов!'})

    } catch (e) {
        return res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createNewGlobalPromt: createGlobalPromt}
const prisma = require('../../prisma/prisma-client')
const bcrypt = require("bcrypt");

/**
 * Создание нового GlobalPromt
 * @route PUT /api/promt/create-new-promt
 * @Access Private
 */

const createNewGlobalPromt = async (req, res) => {

    try {

        const {value} = req.body

        // условие - на отсутствие введёного промта
        if (value.length <= 0) {
            res.status(400).json({message: 'Промт обязятелен к заполнению'})
        }
        // условие - на количество символов
        // TODO почему не создаётся промт при наличии данной проверки?
        // if (value.length > 1000) {
        //     res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        // }

        // Изменение Глобального промта администратора - Company (первоначальное создание происходит в момент создания Company - админа)
        const newPromt = await prisma.prisma.globalPromt.update({
            where: {
                companyId: req.company.id
            },
            data: {
                value,
            }
        })

        res.status(200).json({newPromt, message: 'Промт готов!'})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createNewGlobalPromt}
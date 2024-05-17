const prisma = require('../../prisma/prisma-client')
const bcrypt = require("bcrypt");

/**
 * Создание нового GlobalPromt
 * @route POST /api/promt/create-new-promt
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
        if (value.length > 1000) {
            res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        }

        // Создание Глобального промта администратора - Company
        const newPromt = await prisma.prisma.globalPromt.create({
            data: {
                value,
                companyId: req.company.id
            }
        })

        res.status(200).json({newPromt, message: 'Промт создан!'})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createNewGlobalPromt}
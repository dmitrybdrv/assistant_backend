const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')


/**
 * Создание нового пароля
 * @route POST /api/company/create-new-password
 * @Access Private
 */
const createNewPassword = async (req, res) => {

    try {

        const {password} = req.body
        const company = req.company

        //условие - на отсутствие введёного password для создания нокого
        if (!password) {
            res.status(400).json({message: 'Введите новый пароль'})
        }
        //условие - на отсутствие введёного password для создания нокого
        if (password.length <= 5 || password.length > 30) {
            res.status(400).json({message: 'Длина пароля от 6 до 30 имволов'})
        }

        //зашифровывание нового пароля (для последующей перезаписи в базу зашифрованного пароля)
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(password, salt)

        //Замена пароля у найденного пользователя
        await prisma.prisma.company.update({
            where: { id: company.id },
            data: { password: hashedNewPassword }
        });

        res.status(200).json({message: 'Пароль успешно изменён'})

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createNewPassword}
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

        //Условие - на отсутствие введёного password для создания нокого
        if (!password) {
            return res.status(400).json({message: 'Введите новый пароль'})
        }
        //Условие - на отсутствие введёного password для создания нокого
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Длина пароля должна быть от 6 до 30 символов'})
        }

        //Условие - на соответствие пароля правилу
        if (!password.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).json({message: 'Пароль может состоять из латинских букв (верхнего и нижнего регистра), цифр и символов'});
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
        console.error('Ошибка при создании нового пароля:', e) // Логирование ошибки для отладки
        return res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {createNewPassword}
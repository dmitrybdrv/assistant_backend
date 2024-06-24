const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')

/**
 * @route PUT /api/users/edit/:id
 * @desc Редактирование пользователя (сотрудника)
 * @Access Private
 */
const editUser = async (req, res) => {

    try {
        const userId = req.params.id
        const data = req.body

        const existingUser = await prisma.prisma.user.findFirst({
            where: {
                id: userId,
                // админ может редактировать только своего пользователя по id (Редактирование имени)
                companyId: req.company.id
            }
        })

        if (!existingUser) {
            return res.status(400).json({message: 'Невозможно отредактировать!'})
        }

        const updatedData = {}

        // Условие на длину имени
        if (data.name !== undefined) {
            if (data.name.length < 1 || data.name.length > 45) {
                return res.status(400).json({message: 'Длина имени от 1 до 45 символов'})
            } else {
                updatedData.name = data.name
            }
        }

        // Условие на соответствие почтового адреса
        if (data.email !== undefined) {
            if (!data.email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/)) {
                return res.status(400).json({message: 'Адрес эл.почты не соответствует требованиям'})
            } else {
                updatedData.email = data.email
            }
        }

        // Условие - поверка валидности пароля (длина)
        if (data.password !== undefined) {
            if (data.password.length <= 5 || data.password.length > 30) {
                return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'})
            } else {
                const salt = await bcrypt.genSalt(10)
                updatedData.password = await bcrypt.hash(data.password, salt)
            }
        }

        await prisma.prisma.user.update({
            where: {
                id: userId
            },
            data: updatedData
        })

        res.status(200).json({message: 'Отредактировано!'})

    } catch (e) {
        console.error('Ошибка при редактировании сотрудника:', e) // Логирование ошибки для отладки
        return res.status(500).json({ message: 'Что-то пошло не так' })
    }

}

module.exports = {editUser}
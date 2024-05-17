const prisma = require('../../prisma/prisma-client')

/**
 * @route PUT /api/users/edit
 * @desc Редактирование бота
 * @Access Private
 */
const editUser = async (req, res) => {

    try {
        const data = req.body

        const user = await prisma.prisma.user.update({
            where: {
                id: data.id,
                // админ может редактировать только своего пользователя по id
                companyId: req.company.id
            },
            data: {
                ...data,
            }
        })

        return res.status(200).json({user, message: 'Отредактировано!'})

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось изменить'
        })
    }

}

module.exports = {editUser}
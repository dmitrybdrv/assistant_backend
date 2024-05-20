const prisma = require('../../prisma/prisma-client')

/**
 * @route PUT /api/users/edit/:id
 * @desc Редактирование пользователя (субпользователя)
 * @Access Private
 */
const editUser = async (req, res) => {

    try {
        const {name, id} = req.body

        const user = await prisma.prisma.user.update({
            where: {
                id,
                // админ может редактировать только своего пользователя по id (Редактирование имени)
                companyId: req.company.id
            },
            data: {
                name: name,
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
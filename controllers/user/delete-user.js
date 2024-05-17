const prisma = require('../../prisma/prisma-client')



/**
 * @route POST /api/users/remove
 * @desc Удаление пользователя (субпользователя)
 * @Access Private
 */
const deleteUser = async (req, res) => {
    try {
        const {id} = req.body;

        const deletedUser = await prisma.prisma.user.delete({
            where: {
                id,
                // админ может удалять только своего пользователя по id
                companyId: req.company.id
            },
        });

        if (deletedUser) {
            res.status(200).json({message: 'Пользователь удалён!'});
        }

    } catch (e) {
        res.status(500).json({message: 'Не удалось удалить Пользователя'});
    }
}

module.exports = {deleteUser}
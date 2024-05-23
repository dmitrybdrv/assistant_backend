const prisma = require('../../prisma/prisma-client')



/**
 * @route DELETE /api/users/remove/:id
 * @desc Удаление пользователя (субпользователя)
 * @Access Private
 */
const deleteUser = async (req, res) => {
    try {
        const {id} = req.body;

        const userForDelete = await prisma.prisma.user.findFirst({
            where: {
                id
            }
        })

        // Если ни одного пользователя по заданному Id не удалось найти (вернулся null)
        if (!userForDelete) {
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        await prisma.prisma.user.delete({
            where: {
                id,
                // админ может удалять только своего пользователя по id
                companyId: req.company.id
            },
        });


        res.status(200).json({message: 'Пользователь удалён!'});


    } catch (e) {
       return res.status(500).json({message: 'Не удалось удалить Пользователя'});
    }
}

module.exports = {deleteUser}
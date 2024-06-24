const prisma = require('../../prisma/prisma-client')



/**
 * @route DELETE /api/users/remove/:id
 * @desc Удаление пользователя (сотрудника)
 * @Access Private
 */
const deleteUser = async (req, res) => {

    try {
        const userId = req.params.id

        const userForDelete = await prisma.prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        // Если ни одного пользователя по заданному Id не удалось найти (вернулся null)
        if (!userForDelete) {
            return res.status(400).json({message: 'Сотрудник не найден'});
        }

        await prisma.prisma.user.delete({
            where: {
                id: userId,
                // админ может удалять только своего пользователя по id
                companyId: req.company.id
            },
        });


        res.status(200).json({message: 'Пользователь удалён!'});


    } catch (e) {
        console.error('Ошибка при удалении сотрудника:', e) // Логирование ошибки для отладки
       return res.status(500).json({message: 'Не удалось удалить сотрудника'});
    }
}

module.exports = {deleteUser}
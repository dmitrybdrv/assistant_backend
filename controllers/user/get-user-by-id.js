const prisma = require('../../prisma/prisma-client')


/**
 * @route GET /api/users/find/:id
 * @desc Получение одного пользователя
 * @Access Private
 */
const getUserById = async (req, res) => {

    try {

        const {userId} = req.body // id искомого пользователя

        const user = await prisma.prisma.user.findFirst({
            where: {
                id: userId,
                // админ может получать только своих пользователей
                companyId: req.company.id
            }
        })


        if (!user) {
           return res.status(400).json({message: 'Cотрудник не найден'})
        }

        const userForResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            companyId: user.companyId
        }

        res.status(200).json(userForResponse)

    } catch (e) {
        console.error('Ошибка при получении сотрудника:', e) // Логирование ошибки для отладки
       return res.status(400).json({message: 'Что-то пошло не так'})
    }

}


module.exports = {getUserById}
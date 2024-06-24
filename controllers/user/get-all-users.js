const prisma = require('../../prisma/prisma-client')

/**
 * @route GET /api/users/all
 * @desc Получение всех пользователей
 * @Access Private
 */
const getAllUsers = async (req, res) => {

    try {
        // Массив пользователей (либо пустой, либо с пользователями, которые принадлежат конкретной компании)
        const users = await prisma.prisma.user.findMany({
            where: {
                companyId: req.company.id
            }
        })

        if(!users) {
            return res.status(400).json({message: 'Не удалось получить сотрудников'})
        }

        const usersForResponse = users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            companyId: user.companyId
        }))

        res.status(200).json(usersForResponse)

    } catch (e) {
        console.error('Ошибка при получении сотрудников:', e) // Логирование ошибки для отладки
        return res.status(400).json({message: 'Что-то не так'})
    }

}

module.exports = {getAllUsers}
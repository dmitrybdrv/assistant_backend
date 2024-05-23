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

        res.status(200).json(users)

    } catch (e) {
        return res.status(400).json({message: 'Что-то не так на бэке'})
    }

}

module.exports = {getAllUsers}
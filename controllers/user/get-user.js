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

        // TODO добавить проверку -Если указанный ID не существует (крашется апп. уточнить у gpt)
        if (!user) {
           return res.status(400).json({message: 'Указанный сотрудник не найден'})
        }

        res.status(200).json(user)

    } catch (e) {
       return res.status(400).json({
            message: 'Что-то не так на бэке'
        })
    }

}


module.exports = {getUserById}
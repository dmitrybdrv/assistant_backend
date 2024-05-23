const jwt = require('jsonwebtoken')
const {prisma} = require('../prisma/prisma-client')

/*
приватный роут
 */
const auth = async (req, res, next) => {

    try {
        // Достаём приходящий с фронта (клиента) токен - зашифрованный id пользователя (если он передался в headers)
        let token = req.headers.authorization?.split(' ')[1]

        // Расшифровываем токен (id)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //поиск пользователя в базе по id, если пользователь найден передаём его дальше
        req.company = await prisma.company.findUnique({
            where: {
                id: decoded.id
            }
        })

        if(!req.company) {
            return res.status(400).json({message: 'Не авторизован'})
        }

        next()

    } catch (error) {
        return res.status(400).json({message: 'Не авторизован'})
    }
}

module.exports = {auth}
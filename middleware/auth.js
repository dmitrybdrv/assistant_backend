const jwt = require('jsonwebtoken')
const {prisma} = require('../prisma/prisma-client')

/*
приватный роут
 */
const auth = async (req, res, next) => {

    try {
        //достаём приходящий с фронта (клиента) токен - зашифрованный id пользователя (если он есть)
        let token = req.headers.authorization?.split(' ')[1]

        //расшифровываем токен (id)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //поиск пользователя в базе по id
         const company = await prisma.company.findUnique({
            where: {
                id: decoded.id
            }
        })

        //если пользователь найден передаём его дальше
        req.company = company

        next()

    } catch (error) {
        res.status(401).json({message: 'Не авторизован'})
    }
}

module.exports = {auth}
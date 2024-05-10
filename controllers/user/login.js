const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 *
 * @route POST /api/user/login
 * @desc Логинизация
 * @access Public
 */
const login = async (req, res) => {

    try {

        const {email, password, rememberMe} = req.body

        //условие - на отсутствие введёного email или password при авторизации
        if (!email || !password) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
        }

        //условие - поверка валидности пароля (длина)
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'});
        }

        //поиск пользователя в базе.
        const user = await prisma.prisma.user.findFirst({
            where: {
                email,
            },
        });

        //Сравнение пароля - если пользователь нашёлся в базе и введённый пароль соответствует паролю в базе (сравнение
        // введённого пользователем пароля с хэшированным паролем, хранящимся в базе данных)
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        //создание jwt токена
        const secret = process.env.JWT_SECRET

        //не протухаемый токен в течении 3 дней
        const notExpiresToken = rememberMe ? '3d' : '1h'

        //условие - на соответствие логина и пароля (+наличие secret записи в .env) найденного в базе пользователя, введённым данным для авторизации
        if (isPasswordCorrect && user && secret) {

            //при соответствии - положительный ответ (объект с данными)
            return res.status(200).json({
                message: `Добро пожаловать ${user.name}!`,
                token: jwt.sign({id: user.id}, secret, {expiresIn: notExpiresToken}),
                // name: user.name,
                // email: user.email,
                // createdBots: user.createdReviewerBot
            })
        } else {
            return res.status(400).json({message: 'Не верно введён логин или пароль'})
        }

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке!'})
    }

}

module.exports = {login}
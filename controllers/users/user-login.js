const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 *
 * @route POST /apt/user/login
 * @desc Логин
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

        //Верный пароль - если пользователь нашёлся в базе и введённый пароль соответствует паролю в базе
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        //создание jwt токена
        const secret = process.env.JWT_SECRET

        //не протухаемый токен в течении 3 дней
        const notExpiresToken = rememberMe ? '3d' : '1h'

        //условие - на соответствие логина и пароля (+наличие secret записи в .env) найденного в базе пользователя, введённым данным для авторизации
        if (isPasswordCorrect && user && secret) {
            //Если у пользователя уже есть имя, тогда отправить имя иначе ГОСТЬ
            const userName = user.name ? user.name : 'Guest'
            //при соответствии - положительный ответ (объект с данными)
            return res.status(200).json({
                id: user.id,
                email: user.email,
                name: userName,
                token: jwt.sign({id: user.id}, secret, {expiresIn: notExpiresToken})
            })
        } else {
            return res.status(400).json({message: 'Не верно введён логин или пароль'})
        }

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так!'})
    }

}

module.exports = {login}
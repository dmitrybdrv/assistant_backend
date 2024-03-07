const prisma = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 *
 * @route POST /apt/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req, res) => {
    const {email, password} = req.body

    //условие - на отсутствие введёного email или password
    if (!email || !password) {
        return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
    }

    //поиск пользователя в базе.
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });

    //Верный пароль - если пользователь нашёлся в базе и введённый пароль соответствует паролю в базе
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    //условие - на соответствие логина и пароля найденного в базе пользователя, введённым данным для авторизации
    if (isPasswordCorrect && user) {
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name
        })
    } else {
        return res.status(400).json({
            message: 'Не верно введён логин или пароль'
        })
    }

}

const register = async (req, res) => {
    res.send('register');
}

const current = async (req, res) => {
    res.send('current');
}

module.exports = {login, register, current}
const prisma = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const path = require('path');
const fs = require("fs")
const handlebars = require('handlebars')
const {log} = require("debug");


const RESET_PASSWORD = process.env.RESET_PASSWORD
const PASSWORD_FOR_SMTP = process.env.PASSWORD_FOR_SMTP
const LOGIN_FOR_SMTP = process.env.LOGIN_FOR_SMTP

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

        //не протухаемый токен в течении 1 дня
        const notExpiresToken = rememberMe ? '3d' : '1'

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

/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
    try {

        const {email, password, name} = req.body

        //условие - на отсутствие введёного email или password при регистрации
        if (!email || !password || !name) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
        }

        //поиск уже существующего в базе пользователя
        const alreadyRegisteredUser = await prisma.prisma.user.findFirst({
            where: {
                email,
            }
        })

        //условие - поверка валидности пароля (длина)
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'});
        }

        //условие - если уже существует в базе
        if (alreadyRegisteredUser) {
            return res.status(400).json({
                message: 'Пользователь с таким email уже существует'
            })
        }

        //зашифровывание пароля (для последующей записи в базу зашифрованного пароля)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //создание нового пользователя (если не найден в базе)
        const newUser = await prisma.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        //создание jwt токена
        const secret = process.env.JWT_SECRET

        //условие - если пользователь создан и secret в наличии, возвращается объект с id, email, token
        //TODO нужно ли возвращать всё при регистрации или вернуть только token?!
        if (newUser && secret) {
            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                //создание jwt токена, который обнулиться через 1 день.
                //TODO изменить период протухания токена на меньшее значение
                //token: jwt.sign({id: newUser.id}, secret, {expiresIn: '1d'})
            })
        } else {
            return res.status(400).json({
                message: 'Не удалось создать пользователя'
            })
        }

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так'})
    }

}

/**
 * Аутентификация
 * @route Get /api/user/current
 * @Access Private
 */
const current = async (req, res) => {

    try {
        res.status(200).json(req.user);
    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так'})
    }

}

/**
 * Восстановление пароля => сброс ссылки на почту
 * @route POST /api/user/forgot-password
 * @Access Public
 */
const recovery = async (req, res) => {

    try {

        const {email} = req.body

        //поиск уже существующего в базе пользователя
        const foundedUser = await prisma.prisma.user.findFirst({
            where: {
                email,
            }
        })

        //если пользователя с введённым email не найден в базе
        if (!foundedUser) {
            return res.status(400).json({
                message: 'Пользователь с таким email не найден!'
            })
        }

        //импорт письма - шаблона для перехода по ссылке на сброс пароля (создание нового пароля)
        //const filePath = path.join(__dirname, '..', 'src/common/template.html')

        //поддержка передачи utf8 ?
        //const fileContent = fs.readFileSync(filePath, 'utf8')
        //создание шаблона
        //const template = handlebars.compile(fileContent)

        // Подготовка данных для шаблона
        // const templateData = {
        //     userName: foundedUser.name,
        //     resetLink: RESET_PASSWORD,
        // };

        // Генерация HTML-кода на основе шаблона и данных
        //const html = template({RESET_PASSWORD});

        //создание jwt токена (закодированного id)
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({id: foundedUser.id}, secret, {expiresIn: '1d'})

        //передача данных в файл common/template.html для настройки отправляемого письма
        const html =
            `
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
                    <body>
                     <div>
    <h1>Здравствуйте, ${foundedUser.name ? foundedUser.name : 'друг'}!</h1>
    <div>
        <p style="font-size: 18px">
            Мы получили запрос на сброс пароля в сервисе OzonAssistant.
            Перейдя по ссылке необходимо создать новый пароль для входа в приложение:
            ${RESET_PASSWORD}${token}
        </p>
    </div>
    <div>
        <p style="font-size: 14px; color: #808080">
            Если вы не оправляли запрос на сброс пароля в сервисе OzonAssistant или вы не хотите больше получать от нас письма,
            свяжитесь с нами, написав нам на эл.почту <strong>ozonassist@support.ru</strong> .
        </p>
    </div>
</div>
                    </body>
            </html>`


        //создание и настройка транспорта
        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: LOGIN_FOR_SMTP,
                pass: PASSWORD_FOR_SMTP,
            },
        })

        //настройка почтового отправления
        const mailOptions = {
            from: 'nixpromto@yandex.ru',
            to: 'nixpromto@yandex.ru',
            subject: 'Сброс пароля',
            text: "Plaintext version of the message",
            html,
        }

        //ответ на запрос /api/user/recovery
        await transporter.sendMail(mailOptions)

        res.status(200).send({message: 'Инструкции отправлены на почту'})

    } catch (e) {

        res.status(400).json({message: 'Что-то пошло не так на бэке'})
        console.log(e)
    }
}

/**
 * Создание нового пароля
 * @route POST /api/user/create-new-password
 * @Access Private
 */
const createNewPassword = async (req, res) => {

    try {

        const {password} = req.body
        const user = req.user

        //условие - на отсутствие введёного password для создания нокого
        if (!password) {
            res.status(400).json({message: 'Введите новый пароль'})
        }
        //условие - на отсутствие введёного password для создания нокого
        if (password.length <= 5 || password.length > 30) {
            res.status(400).json({message: 'Длина пароля от 6 до 30 имволов'})
        }

        //зашифровывание нового пароля (для последующей перезаписи в базу зашифрованного пароля)
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(password, salt)

        //Замена пароля у найденного пользователя
        await prisma.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedNewPassword }
        });

        res.status(200).json({message: 'Пароль успешно изменён'})

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {login, register, current, recovery, createNewPassword}
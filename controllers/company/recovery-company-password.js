const prisma = require('../../prisma/prisma-client')
const path = require('path')
const fs = require("fs")
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


const RESET_PASSWORD = process.env.RESET_PASSWORD
const PASSWORD_FOR_SMTP = process.env.PASSWORD_FOR_SMTP
const LOGIN_FOR_SMTP = process.env.LOGIN_FOR_SMTP

/**
 * Восстановление пароля => сброс ссылки на почту
 * @route POST /api/company/recovery-password
 * @Access Public
 */
const recovery = async (req, res) => {

    try {

        const {email} = req.body

        //поиск уже существующего в базе пользователя
        const foundedCompany = await prisma.prisma.company.findFirst({
            where: {
                email,
            }
        })

        //если пользователя с введённым email не найден в базе
        if (!foundedCompany) {
            return res.status(400).json({
                message: 'Пользователь с таким email не найден!'
            })
        }

        //создание jwt токена (закодированного id)
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({id: foundedCompany.id}, secret, {expiresIn: '1d'})

        //импорт письма - шаблона для перехода по ссылке на сброс пароля (создание нового пароля)
        const filePath = path.join(__dirname, '../..', '/common/template.html')

        //поддержка передачи utf8 ?
        const fileContent = fs.readFileSync(filePath, 'utf8')
        //создание шаблона
        const template = handlebars.compile(fileContent)

        // Генерация HTML-кода на основе шаблона и данных
        const html = template({RESET_PASSWORD, foundedCompany, token});

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

        //ответ на запрос /api/company/recovery
        await transporter.sendMail(mailOptions)

        res.status(200).send({message: `Инструкции отправлены на почту ${email}`})

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }
}

module.exports = {recovery}
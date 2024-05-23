const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')

/**
 *
 * @route POST /api/company/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
    try {

        const {email, password, name, inn} = req.body

        //условие - на отсутствие введёного email или password при регистрации
        if (!email || !password || !name || !inn) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
        }

        // Условие - поверка валидности пароля (длина)
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'});
        }

        // Поиск уже существующего в базе пользователя по Email
        if(email) {
            const allReadyEmail = await prisma.prisma.company.findFirst({
                where: {
                    email,
                }
            })
            if(allReadyEmail) {
                return res.status(400).json({message: 'Пользователь с таким email или ИНН уже существует'})
            }
        }

        // Поиск уже существующего в базе пользователя по ИНН
        if(inn) {
            const allReadyInn = await prisma.prisma.company.findFirst({
                where: {
                    inn,
                }
            })
            if(allReadyInn) {
                return res.status(400).json({message: 'Пользователь с таким email или ИНН уже существует'})
            }
        }

        //зашифровывание пароля (для последующей записи в базу зашифрованного пароля)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //создание нового пользователя (если не найден в базе)
        const newCompany = await prisma.prisma.company.create({
            data: {
                name,
                email,
                inn,
                password: hashedPassword,
                GlobalPromt: {
                    create: {
                        value: ""
                    }
                }
            }
        })

        //создание jwt токена
       const secret = process.env.JWT_SECRET

        // Если пользователь создан и secret в наличии, возвращается объект с id, email, token
        if (newCompany && secret) {
            res.status(201).json({
                message: 'Вы зарегистрированы, теперь можете войти в аккаунт'
                })

        } else {
            return res.status(400).json({
                message: 'Не удалось зарегистрироваться!'
            })
        }

    } catch (e) {
        return res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {register}
const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')

/**
 *
 * @route POST /api/company/register
 * @desc Регистрация
 * @access Public
 */
//TODO Вынести общую функцию по проверки валидности и прочего (для регистрации, редактирования и в других местах где есть)
const register = async (req, res) => {
    try {

        const {email, password, name, inn} = req.body

        //условие - на отсутствие введёного email или password при регистрации
        if (!email || !password || !name || !inn) {
            return res.status(400).json({message: 'Пожалуйста, заполните обязательные поля'});
        }

        // Условие на соответствие почтового адреса
        if(!email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/)) {
            return res.status(400).json({message: 'Адрес эл.почты не соответсвует требованиям'})
        }

        // Условие - поверка валидности пароля (длина)
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'});
        }

        //Условие - на соответствие пароля правилу
        if (!password.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).json({message: 'Только латинские буквы (верхнего и нижнего регистра), цифр и символов'});
        }

        // Условие на длину имени
        if(name.length < 1 || name.length > 45) {
            return res.status(400).json({message: 'Длина имени от 1 до 45 символов'})
        }

        // Условие на соответствие почтового адреса
        if(inn.length > 12 || inn.length < 12) {
            return res.status(400).json({message: 'ИНН не соответсвует требованиям'})
        }

        //Поиск аналогичных пользователей (уже существующих в базе с данными ИНН или Почтой - либо то, либо то)
        const alreadyRegistered = await prisma.prisma.company.findFirst({
            where: {
                OR: [
                    { inn },
                    { email }
                ]
            }
        })

        // Условие на уже зарегистрированного пользователя с такими данными (email или inn)
        if(alreadyRegistered) {
            return res.status(400).json({message: 'Пользователь с идентичными данными уже существует'})
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
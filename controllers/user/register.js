const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')

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

        //условие - поверка валидности пароля (длина)
        if (password.length <= 5 || password.length > 30) {
            return res.status(400).json({message: 'Пароль должен состоять от 6 до 30 символов'});
        }

        //поиск уже существующего в базе пользователя
        const alreadyRegisteredCompany = await prisma.prisma.company.findFirst({
            where: {
                email,
            }
        })

        //условие - если уже существует в базе
        if (alreadyRegisteredCompany) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'})}

        //зашифровывание пароля (для последующей записи в базу зашифрованного пароля)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //создание нового пользователя (если не найден в базе)
        const newCompany = await prisma.prisma.company.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        //создание jwt токена
       const secret = process.env.JWT_SECRET

        //условие - если пользователь создан и secret в наличии, возвращается объект с id, email, token
        if (newCompany && secret) {
            res.status(201).json({
                message: 'Вы зарегистрированы, теперь можете войти в аккаунт'
                // id: newUser.id,
                // name: newUser.name,
                // email: newUser.email,
                //создание jwt токена, который обнулиться через 1 день.
                //token: jwt.sign({id: newUser.id}, secret, {expiresIn: '1d'})
            })
        } else {
            return res.status(400).json({
                message: 'Не удалось зарегистрироваться!'
            })
        }

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {register}
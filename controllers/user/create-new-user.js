const prisma = require('../../prisma/prisma-client')
const bcrypt = require('bcrypt')

/**
 * @route POST /api/users/add
 * @desc Создание нового пользователя
 * @Access Private
 */
const createUser = async (req, res) => {

    try {
        const data = req.body

        if (!data.name || !data.email || !data.password) {
            return res.status(400).json({message: 'Заполните все обязательные поля'})
        }

        // Поиск создаваемого пользователя - сотрудника в базе.
        const alreadyCreatedUser = await prisma.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        // Не добавлять если уже есть такой пользователь
        if (alreadyCreatedUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'})
        }

        //зашифровывание пароля (для последующей записи в базу зашифрованного пароля для субпользователя / User)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)

        //Создание пользователя
        const newUser = await prisma.prisma.user.create({
            data: {
                ...data,
                /*TODO придумать рандомайзер для присваивания пароля*/
                password: hashedPassword, // При первоначальном создании пользователя криптуется и присваевается дефолтный пароль (Pr0FF3s10N@l)
                companyId: req.company.id
            }
        })

        const userForResponse = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            companyId: newUser.companyId
        }

        res.status(200).json({userForResponse, message: 'Пользователь - сотрудник создан!'})

    } catch (e) {
        console.error('Ошибка при создании сотрудника:', e) // Логирование ошибки для отладки
        return res.status(500).json({message: 'Не удалось создать сотрудника'})
    }

}

module.exports = {createUser}
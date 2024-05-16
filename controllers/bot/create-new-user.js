const prisma = require('../../prisma/prisma-client')

/**
 * @route POST /api/users/add
 * @desc Создание бота
 * @Access Private
 */
const createUser = async (req, res) => {

    try {
        const data = req.body

        if (!data.name || !data.email) {
            return res.status(400).json({message: 'Заполните все поля'})
        }

        // Поиск создаваемого пользователя - сотрудника в базе.
        const alreadyCreatedUser = await prisma.prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        // Не добавлять если уже есть такой пользователь
        if(alreadyCreatedUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'})
        }

        // Не добавлять если уже есть такой пользователь
        if(alreadyCreatedUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существ'})
        }

       const newUser = await prisma.prisma.user.create({
            data: {
                ...data,
                companyId: req.company.id
            }
        })


        return res.status(200).json({newUser, message: 'Пользователь - сотрудник создан!'})

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось создать пользователя - сотрудника'
        })
    }

}

module.exports = {createUser}
const prisma = require('../../prisma/prisma-client')


/**
 * @route PATCH /api/company/edit
 * @desc Изменение Company - аккаунт администратора
 * @Access Private
 */

const editCompany = async (req, res) => {

    try {
        const data = req.body

        // Условие на длину имени
        if(data.name !== undefined && (data.name.length < 1 || data.name.length > 45)) {
            return res.status(400).json({message: 'Длина имени от 1 до 45 символов'})
        }

        //Условие на соответствие почтового адреса
        if(data.email !== undefined && !data.email.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/)) {
            return res.status(400).json({message: 'Адрес эл.почты не соответсвует требованиям'})
        }

        // Условие на соответствие почтового адреса
        if(data.inn !==undefined && (data.inn.length > 12 || data.inn.length < 12)) {
            return res.status(400).json({message: 'ИНН не соответсвует требованиям'})
        }

        //Поиск аналогичных пользователей (уже существующих в базе с данными ИНН или Почтой - либо то, либо то)
        const alreadyRegistered = await prisma.prisma.company.findFirst({
           where: {
               OR: [
                   { inn: data.inn },
                   { email: data.email }
               ]
           }
        })

        // Условие на уже зарегистрированного пользователя с такими данными (email или inn)
        if(alreadyRegistered) {
            return res.status(400).json({message: 'Невозможно заменить'})
        }

        const companyUpdated = await prisma.prisma.company.update({
            where: {
                id: req.company.id
            },
            data: {
                ...data
            }
        })

        const company = {
            name: companyUpdated.name,
            email: companyUpdated.email,
            inn: companyUpdated.inn
        }

        res.status(200).json({company, message: 'Отредактировано!'})

    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Не удалось изменить'})
    }

}

module.exports = {editCompany}
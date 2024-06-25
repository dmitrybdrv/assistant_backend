const prisma = require('../../prisma/prisma-client')

/**
 * Создание нового GlobalPromt
 * @route PUT /api/promt/create-global-promt
 * @Access Private
 * @description метод PUT, так как создание происходит сразу после создания company. Создаётся пустой и далее с помощью PUT заполняем
 */

const createGlobalPromt = async (req, res) => {

    try {

        const {value} = req.body

        if (value.length > 1000) {
           return res.status(400).json({message: 'Длина промта не должна превышать 1000 символов'})
        }

        // Изменение Глобального промта администратора - Company (первоначальное создание происходит в момент создания Company - админа)
        const newPromt = await prisma.prisma.globalPromt.update({
            where: {
                companyId: req.company.id // req.company.id - админский id (расшифрованный)
            },
            data: {
                value,
            }
        })

        res.status(200).json({newPromt, message: 'Промт готов!'})

    } catch (e) {
        console.error('Ошибка при создании глобального промта:', e) // Логирование ошибки для отладки
        return res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {createNewGlobalPromt: createGlobalPromt}
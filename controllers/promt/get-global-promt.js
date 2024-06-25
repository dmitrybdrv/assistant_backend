const prisma = require('../../prisma/prisma-client')

/**
 * @route GET /api/promt/get-globalpromt
 * @desc Получение Глобального админского Промта
 * @Access Private
 */
const getGlobalPromt = async (req, res) => {

    try {

        // Объект GlobalPromt (либо пустой объект который принадлежит конкретной компании - админу)
        const promt = await prisma.prisma.globalPromt.findUnique({
            where: {
                companyId: req.company.id
            },
        })

        // Если не удалось найти ранее создаваемый промт
        if(!promt) {
           return res.status(400).json({message: 'Глобальный промт не найден!'})
        }

        res.status(200).json(promt)

    } catch (e) {
        console.error('Ошибка при получении Глобального промта:', e) // Логирование ошибки для отладки
       return res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {getGlobalPromt}
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
            res.status(400).json({message: 'Промт не найден!'})
        }

        res.status(200).json(promt)

    } catch (e) {
        res.status(400).json({
            message: 'Не удалось получить Глобальный промт'
        })
    }

}

module.exports = {getGlobalPromt}
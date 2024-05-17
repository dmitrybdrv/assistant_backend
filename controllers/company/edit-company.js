const prisma = require('../../prisma/prisma-client')


/**
 * @route PUT /api/company/edit
 * @desc Изменение Company - аккаунт администратора
 * @Access Private
 */

const editCompany = async (req, res) => {

    try {
        const data = req.body

        const company = await prisma.prisma.company.update({
            where: {
                id: data.id,
            },
            data: {
                ...data,
            }
        })

        return res.status(200).json({company, message: 'Отредактировано!'})

    } catch (e) {
        res.status(500).json({
            message: 'Не удалось изменить'
        })
    }

}

module.exports = {editCompany}
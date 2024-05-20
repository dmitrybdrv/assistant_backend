const prisma = require('../../prisma/prisma-client')


/**
 * @route Delete /api/company/remove
 * @desc Удаление Company - аккаунт администратора
 * @Access Private
 */
const deleteCompany = async (req, res) => {
    try {
        const {id} = req.body;

        const deletedCompany = await prisma.prisma.company.findUnique({
            where: {
                id,
            }
        });

        // Если на удаление отправлено несколько запросов, но удаление уже прошло и пользователя нет в базе
        if (!deletedCompany) {
            res.status(400).json({message: 'Аккаунт не найден'});
        }

        //TODO добавить проверку на наличие токена (один раз получилось удалить без токена только по ИД)

        // Удаление всех пользователей в аккаунте
        await prisma.prisma.user.deleteMany()
        // Удаление Глобального промта в аккаунте
        await prisma.prisma.marketPlace.deleteMany()
        // Удаление всех маркетплейсов в аккаунте
        await prisma.prisma.globalPromt.deleteMany()

        if (deletedCompany) {
            await prisma.prisma.company.delete({ where: {id}})
            res.status(200).json({message: 'Аккаунт удалён'});
        }


    } catch (e) {
        res.status(500).json({message: 'Не удалось удалить аккаунт'});
    }
}

module.exports = {deleteCompany}
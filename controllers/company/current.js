

/**
 * Аутентификация
 * @route Get /api/company/current
 * @Access Private
 */
const current = async (req, res) => {

    try {

        const company = {
            name: req.company.name,
            email: req.company.email,
            inn: req.company.inn,
        }

        res.status(200).json(company)

    } catch (e) {
        console.error('Ошибка при выполнении current:', e) // Логирование ошибки для отладки
        return res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {current}
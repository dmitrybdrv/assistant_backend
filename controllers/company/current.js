

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
        }

        res.status(200).json(company)

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }

}

module.exports = {current}


/**
 * Аутентификация
 * @route Get /api/user/current
 * @Access Private
 */
const current = async (req, res) => {

    try {
        res.status(200).json(req.user);
    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {current}
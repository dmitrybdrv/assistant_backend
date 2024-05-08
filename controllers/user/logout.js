/**
 *
 * @route POST /api/user/logout
 * @desc Вылогиневание
 * @access Private
 */

const logout = async (req, res) => {
    try{
        // Удаление токена из кук или заголовка запроса
        //res.clearCookie('token'); // Пример для кук

        //Удаление заголовка
        delete req.headers['Authorization']

        res.status(200).json({message: 'До скорого!'})
    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так на бэке'})
    }
}

module.exports = {logout}
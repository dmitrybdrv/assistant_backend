

/**
 * Аутентификация
 * @route Get /api/user/current
 * @Access Private
 */
const current = async (req, res) => {

    try {

        let createdReviewerBot = [];

        if (req.user.createdReviewerBot) {
            createdReviewerBot = req.user.createdReviewerBot;
        }

        const user = {
            name: req.user.name,
            email: req.user.email,
            createdReviewerBot: createdReviewerBot
        };

        res.status(200).json(user)

    } catch (e) {
        res.status(400).json({message: 'Что-то пошло не так'})
    }

}

module.exports = {current}
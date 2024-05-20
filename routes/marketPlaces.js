const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllMarketPlaces} = require('../controllers/market-place/get-all-marketPlaces')

/* /api/marketplaces/all */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getAllMarketPlaces
router.get('/all', auth, getAllMarketPlaces)


module.exports = router;
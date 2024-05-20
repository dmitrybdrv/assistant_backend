const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllMarketPlaces} = require('../controllers/market-place/get-all-marketPlaces')
const {getMarketplaceById} = require('../controllers/market-place/get-marketplace')

/* /api/marketplaces/all */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getAllMarketPlaces
router.get('/all', auth, getAllMarketPlaces)

/* /api/marketplaces/find/:id */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getMarketplaceById
router.get('/find/:id', auth, getMarketplaceById)


module.exports = router;
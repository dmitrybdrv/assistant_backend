const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllMarketPlaces} = require('../controllers/market-place/get-all-marketPlaces')
const {getMarketplaceById} = require('../controllers/market-place/get-marketplace')
const {deleteMarketplace} = require('../controllers/market-place/delete-marketplace')

/* /api/marketplaces/all */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getAllMarketPlaces
router.get('/all', auth, getAllMarketPlaces)

/* /api/marketplaces/find/:id */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getMarketplaceById
router.get('/find/:id', auth, getMarketplaceById)

/* /api/marketplaces/remove/:id */
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция deleteMarketplace
router.delete('/remove/:id', auth, deleteMarketplace)

module.exports = router;
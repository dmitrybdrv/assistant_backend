const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {createNewGlobalPromt} = require("../controllers/promt/create-global-promt")
const {getGlobalPromt} = require("../controllers/promt/get-global-promt")
const {getMarketPlaceGlobalPromt} = require("../controllers/promt/getMarketPlaceGlobalPromt")
const {createMarketplaceGlobalPromt} = require("../controllers/promt/create-marketplace-global-promt")

/* /api/promt/create-new-promt */
router.put('/create-global-promt',auth, createNewGlobalPromt);

/* /api/promt/get-globalpromt */
router.get('/get-globalpromt',auth, getGlobalPromt);

/* /api/promt/get-marketplace-global-promt */
router.get('/get-marketplace-global-promt', auth, getMarketPlaceGlobalPromt)

/* /api/promt/create-marketplace-global-promt */
router.post('/create-marketplace-global-promt', auth, createMarketplaceGlobalPromt)

module.exports = router
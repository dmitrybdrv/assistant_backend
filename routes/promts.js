const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {createNewGlobalPromt} = require("../controllers/promt/create-global-promt")
const {getGlobalPromt} = require("../controllers/promt/get-global-promt")

/* /api/promt/create-new-promt */
router.put('/create-new-promt',auth, createNewGlobalPromt);

/* /api/promt/get-globalpromt */
router.get('/get-globalpromt',auth, getGlobalPromt);

module.exports = router
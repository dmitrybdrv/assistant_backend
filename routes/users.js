const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {login} = require("../controllers/user/login")
const {register} = require("../controllers/user/register")
const {current} = require("../controllers/user/current")
const {recovery} = require("../controllers/user/recovery-user-password")
const {createNewPassword} = require("../controllers/user/create-new-password")
const {logout} = require("../controllers/user/logout")

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

/* /api/user/recovery-password */
router.post('/recovery-password', recovery)

/* /api/user/create-new-password */
router.post('/create-new-password', auth, createNewPassword)

/* /api/user/logout */
router.post('/logout', auth, logout)

module.exports = router;

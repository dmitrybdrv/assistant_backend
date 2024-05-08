const express = require('express');
const router = express.Router()
const {createNewPassword} = require("../controllers/user/user-createNewPassword")
const {auth} = require('../middleware/auth')
const {login} = require("../controllers/user/user-login")
const {register} = require("../controllers/user/user-register")
const {current} = require("../controllers/user/user-current")
const {recovery} = require("../controllers/user/user-recovery")
const {logout} = require("../controllers/user/user-logout")

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

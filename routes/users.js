const express = require('express');
const router = express.Router()
const {createNewPassword} = require("../controllers/users/user-createNewPassword")
const {auth} = require('../middleware/auth')
const {login} = require("../controllers/users/user-login")
const {register} = require("../controllers/users/user-register")
const {current} = require("../controllers/users/user-current")
const {recovery} = require("../controllers/users/user-recovery")

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

module.exports = router;

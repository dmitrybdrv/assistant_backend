const express = require('express');
const {register, current, login, recovery, createNewPassword} = require("../controllers/users");
const router = express.Router();
const {auth} = require('../middleware/auth')

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

/* /api/user/forgot-password */
router.post('/forgot-password', recovery)

/* /api/user/create-new-password */
router.post('/create-new-password', auth, createNewPassword)

module.exports = router;

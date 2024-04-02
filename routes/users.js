const express = require('express');
const {register, current, login, recover} = require("../controllers/users");
const router = express.Router();
const {auth} = require('../middleware/auth')

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

/* /api/user/recovery */
router.post('/recovery', recover)

module.exports = router;

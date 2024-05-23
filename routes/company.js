const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {login} = require("../controllers/company/login")
const {register} = require("../controllers/company/register")
const {current} = require("../controllers/company/current")
const {recovery} = require("../controllers/company/company-recovery-password")
const {createNewPassword} = require("../controllers/company/create-new-password")
const {logout} = require("../controllers/company/logout")
const {deleteCompany} = require("../controllers/company/delete-company")
const {editCompany} = require("../controllers/company/edit-company")

/* /api/company/register */
router.post('/register', register);

/* /api/company/login */
router.post('/login', login);

/* /api/company/current */
router.get('/current', auth, current);

/* /api/company/recovery-password */
router.post('/recovery-password', recovery)

/* /api/company/create-new-password */
router.post('/create-new-password', auth, createNewPassword)

/* /api/company/logout */
router.post('/logout', auth, logout)

/* /api/company/remove */
router.delete('/remove', auth, deleteCompany)

/* /api/company/edit */
router.patch('/edit', auth, editCompany)

module.exports = router;

const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllUsers} = require('../controllers/user/get-all-users')
const {getUserById} = require('../controllers/user/get-user')
const {createUser} = require('../controllers/user/create-new-user')
const {deleteUser} = require('../controllers/user/delete-user')
const {editUser} = require('../controllers/user/edit-user')

// /api/users
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getAllUsers
router.get('/all', auth, getAllUsers)

// /api/users/find/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getUserById
router.get('/find/:id', auth, getUserById)

// /api/users/add
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция createUser
router.post('/add', auth, createUser)

// /api/users/remove/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция deleteBot
router.delete('/remove/:id', auth, deleteUser)

// /api/users/edit/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция editUser
router.put('/edit/:id', auth, editUser)

module.exports = router;
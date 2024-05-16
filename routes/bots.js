const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllUsers} = require('../controllers/bot/get-all-users')
const {getUserById} = require('../controllers/bot/get-user')
const {createUser} = require('../controllers/bot/create-new-user')

const {deleteBot} = require('../controllers/bot/delete-bot')
const {editBot} = require('../controllers/bot/edit-bot')

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
router.delete('/remove/:id', auth, deleteBot)

// /api/users/edit/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция editBot
router.put('/edit/:id', auth, editBot)



module.exports = router;
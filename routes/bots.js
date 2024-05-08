const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getBotById} = require('../controllers/bot/get-bot')
const {getAllBots} = require('../controllers/bot/get-all-bots')
const {createBot} = require('../controllers/bot/create-new-bot')
const {deleteBot} = require('../controllers/bot/delete-bot')
const {editBot} = require('../controllers/bot/edit-bot')

// /api/bot
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция getAllBots
router.get('/', auth, getAllBots)

// /api/bot/add
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция createBot
router.post('/add', auth, createBot)

// /api/bot/remove/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция deleteBot
router.delete('/remove/:id', auth, deleteBot)

// /api/bot/edit/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция editBot
router.put('/edit/:id', auth, editBot)

// /api/bot/find/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция botById
router.get('/find/:id', auth, getBotById)

module.exports = router;
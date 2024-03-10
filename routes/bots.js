const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {getAllBots, botById, createBot, deleteBot, editBot} = require('../controllers/bots')

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
router.get('/find/:id', auth, botById)

module.exports = router;
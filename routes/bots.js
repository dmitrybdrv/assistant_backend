const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {all, botById, createBot, deleteBot} = require('../controllers/bots')

// /api/bot
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция all
router.get('/', auth, all)

// /api/bot/add
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция createBot
router.post('/add', auth, createBot)

// /api/bot/remove
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция deleteBot
router.delete('/remove', auth, deleteBot)



// /api/bot/:id
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция botById
router.get('/:id', auth, botById)

// /api/bot/edit
// Роут защищён функцией auth. После проверки аутентификации (auth), выполняется функция
router.put('/edit', auth, () => { console.log('edit bot') })



module.exports = router;
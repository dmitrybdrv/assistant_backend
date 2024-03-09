const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {all, botById, createBot, deleteBot} = require('../controllers/bots')

// /api/bot
router.get('/', auth, all)

// /api/bot/:id
router.get('/:id', auth, botById)

// /api/bot/add
router.post('/add', auth, createBot)

// /api/bot/edit
router.put('/edit', auth, () => { console.log('edit bot') })

// /api/bot/remove/:id
router.delete('/remove/:id', auth, deleteBot)

module.exports = router;
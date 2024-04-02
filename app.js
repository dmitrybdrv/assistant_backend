const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


/*
необходим для активации работы .env
 */
require('dotenv').config()

const app = express();

// Разрешить запросы с любых источников
app.use(cors());


/*
подключение логгера
 */
app.use(logger('dev'));

/*
в запросах посылать body через express
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require('./routes/users'))
app.use('/api/bot', require('./routes/bots'))

module.exports = app;

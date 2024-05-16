const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


/*
необходим для активации работы .env
 */
require('dotenv').config()

const app = express();

// Разрешить запросы с любых источников
app.use(cors({
    origin: true,
    credentials: true
}));


/*
подключение логгера
 */
app.use(logger('dev'));

/*
возможность в запросах посылать body через express
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/company', require('./routes/company'))
app.use('/api/users', require('./routes/bots'))

module.exports = app;

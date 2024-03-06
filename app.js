const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/*
необходим для активации работы .env
 */
require('dotenv').config()

const app = express();

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

module.exports = app;

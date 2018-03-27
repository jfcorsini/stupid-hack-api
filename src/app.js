'use strict';

const express = require('express');

const hello = require('./routes/greetWorld');

const app = express();

app.use('/hello', hello);

module.exports = app;

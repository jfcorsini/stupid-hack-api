'use strict';

const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log('The Hello World endpoint was called.');

  next();
});

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = router;

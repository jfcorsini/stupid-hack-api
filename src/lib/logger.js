'use strict';

const winston = require('winston');
const path = require('path');

module.exports = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs.log'),
      timestamp: true,
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

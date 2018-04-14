'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const db = require('./lib/db');

const jsonerror = require('./middleware/jsonerror');
const authActions = require('./routes/auth');
const treeActions = require('./routes/tree');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use((req, res, next) => {
  db.connect();

  res.on('finish', () => {
    db.disconnect();
  });

  next();
});

app.use('/auth', authActions);
app.use('/tree', treeActions);

// Apply error / other middlewares
app.use(jsonerror);

module.exports = app;

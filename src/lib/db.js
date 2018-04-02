'use strict';

const mongoose = require('mongoose');
const bluebird = require('bluebird');

const logger = require('./logger');
const UserModel = require('../models/User');

const { connection } = mongoose;

mongoose.Promise = bluebird;
connection.on('connected', () => {
  logger.debug('Mongoose has connected to the database');
});

connection.on('disconnected', () => {
  logger.debug('Mongoose has disconnected from the database');
});

const connect = () => {
  if (connection.readyState === 0) {
    return mongoose.connect(process.env.MONGODB_CLUSTER_URI);
  }
};

const disconnect = () => {
  if (connection.readyState === 1) {
    connection.close();
  }
};

module.exports = {
  connect,
  disconnect,
  UserModel,
};

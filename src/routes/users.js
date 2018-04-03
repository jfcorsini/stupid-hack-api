'use strict';

const express = require('express');
const validator = require('validator');

const http = require('../lib/http');
const db = require('../lib/db');
const measureAction = require('./measure');

const router = express.Router();

router.param('user', (req, res, next, uuid) => {
  if (validator.isUUID(uuid) === false) {
    return next(new http.BadRequestHttpError('Invalid UUID'));
  }

  return db.UserModel
    .findOne({ _id: uuid })
    .select('-__v -password -measures')
    .then((user) => {
      if (user === null) {
        return next(new http.NotFoundHttpError('Requested user was not found'));
      }

      req.user = user;
      return next();
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/', (req, res, next) => {
  db.UserModel
    .find()
    .select('-__v -password -measures')
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:user', (req, res) => {
  res.json(req.user);
});

router.use('/:user/measures', measureAction);

module.exports = router;

'use strict';

const express = require('express');
const validator = require('validator');

const http = require('../lib/http');
const db = require('../lib/db');

const router = express.Router();

router.param('measure', (req, res, next, uuid) => {
  if (validator.isUUID(uuid) === false) {
    return next(new http.BadRequestHttpError('Invalid UUID'));
  }

  return db.MeasureModel
    .findOne({ _id: uuid })
    .select('-__v')
    .then((measure) => {
      if (measure === null) {
        return next(new http.NotFoundHttpError('Requested measure was not found'));
      }

      req.measure = measure;
      return next();
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/', (req, res, next) => {
  db.UserModel
    .findOne({ _id: req.user._id })
    .populate('measures')
    .then((user) => {
      res.json(user.measures);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const { body, user } = req;
  const payload = Object
    .assign({}, body, {
      user: user._id,
    });

  db.MeasureModel
    .create(payload)
    .then((measure) => {
      user
        .update({ $push: { measures: measure._id } })
        .then(() => {
          res
            .status(201)
            .json(measure);
        });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:measure', (req, res) => {
  res.json(req.measure);
});

module.exports = router;

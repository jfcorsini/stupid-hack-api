'use strict';

const express = require('express');

const http = require('../lib/http');
const db = require('../lib/db');
const auth = require('../lib/auth');

const router = express.Router();

/*
 * The post method expects the body to contain email, password & name.
 */
router.post('/signup', (req, res, next) => {
  const { body } = req;

  db.UserModel
    .create(body)
    .then((user) => {
      res
        .status(201)
        .json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  db.UserModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return next(new http.NotFoundHttpError('Email not found.'));
      }

      return user.comparePassword(password)
        .then(() => {
          res.json({
            token: auth.createJWTToken({
              session: {
                user,
              },
            }),
          });
        })
        .catch(err => next(err));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

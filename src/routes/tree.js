'use strict';

const express = require('express');

const http = require('../lib/http');
const db = require('../lib/db');
const types = require('../lib/types');
const jwtMiddleware = require('../middleware/jwt_auth');
const _ = require('lodash');

const router = express.Router();
router.use(jwtMiddleware);

router.post('/create', (req, res, next) => {
  const userId = req.session.user._id;

  db.TreeModel
    .findOne({ user: userId })
    .then((tree) => {
      if (tree !== null) {
        next(new http.NotFoundHttpError('Already have tree'));
      }

      const { id } = types.getRandom();

      console.log('Random type of tree to create is: ', id);
    
      db.TreeModel
        .create({
          kind: id,
          user: userId,
        })
        .then((newTree) => {
          console.log('Tree created succesfully', newTree);
          res
            .status(201)
            .json(newTree);
        })
        .catch((error) => {
          console.log('Failed to create tree', error);
          next(error);
        });
    })
    .catch((err) => {
      console.log('COULD NOT FIND FOR TREE', err);
      next(err);
    });
});

module.exports = router;

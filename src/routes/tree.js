'use strict';

const express = require('express');

const http = require('../lib/http');
const db = require('../lib/db');
const types = require('../lib/types');
const { getTimeOfDay } = require('../lib/helpers');
const jwtMiddleware = require('../middleware/jwt_auth');

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

      const kind = types.getRandom();
      console.log('Random type of tree to create is: ', kind.id);

      db.TreeModel
        .create({
          kind: kind.id,
          user: userId,
          image: `${kind.name}_zero_${getTimeOfDay()}`,
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

router.post('/update', (req, res, next) => {
  let time = null;
  if (req.body.time !== undefined && req.body.time !== null) {
    time = new Date(req.body.time);
  }

  const now = (time === null) ? new Date() : time;

  console.log('This is now ', now, 'and this is time', time);

  const userId = req.session.user._id;
  db.TreeModel
    .findOne({ user: userId })
    .then((tree) => {
      if (tree === null) {
        next(new http.NotFoundHttpError('You do not have a have tree'));
      }

      if (tree.dead !== null) {
        next(new http.NotFoundHttpError('The tree is dead. You cannot do anything'));
      }

      const type = types.getByKind(tree.kind);

      const timeDiff = Math.abs(now.getTime() - (new Date(tree.planted_at)).getTime());
      const realAge = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const dbAge = tree.age;

      switch (true) {
        case dbAge <= type.phases.one && realAge >= type.phases.one:
          tree.updatePhaseOne(realAge, now);
          break;
        case dbAge <= type.phases.two && realAge >= type.phases.two:
          tree.updatePhaseTwo(realAge, now);
          break;
        case dbAge <= type.phases.three && realAge >= type.phases.three:
          tree.updatePhaseThree(realAge, now);
          break;
        case dbAge <= type.phases.four && realAge >= type.phases.four:
          tree.updatePhaseFour(realAge, now);
          break;
        default:
          console.log('No phase transition. Continuing and updating...');
          tree.updateAge(realAge, now);
          break;
      }

      res
        .status(200)
        .json(tree);
    })
    .catch((err) => {
      console.log('COULD NOT FIND FOR TREE', err);
      next(err);
    });
});

module.exports = router;

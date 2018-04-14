'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');
const types = require('../lib/types');

const treeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  user: {
    type: String,
    ref: 'User',
  },
  planted_at: {
    type: Date,
    default: Date.now,
  },
  kind: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  death: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

const getTimeOfDay = (time) => {
  console.log("TIME GET HOURSSS", time.getHours());
  if (time.getHours() >= 6 && time.getHours() <= 18) {
    return 'day';
  }

  return 'night';
};

// 25% of change of not growing
treeSchema.methods.updatePhaseOne = function updatePhaseOne(age, time) {
  const kindName = types.getNameByKind(this.kind);
  const chance = Math.random();

  this.age = age;
  this.image = `${kindName}_one_${getTimeOfDay(time)}`;
  if (chance <= 0.25) {
    this.death = 'Unfortunately the seed did not grow.';
    this.image = `${kindName}_dead_${getTimeOfDay(time)}`;
  }

  this.save();
};

// 15% of change of not growing
treeSchema.methods.updatePhaseTwo = function updatePhaseTwo(age, time) {
  const kindName = types.getNameByKind(this.kind);
  const chance = Math.random();

  this.age = age;
  this.image = `${kindName}_two_${getTimeOfDay(time)}`;
  if (chance <= 0.15) {
    this.death = 'The chunk was thick but the roots were thin. It is dead now.';
    this.image = `${kindName}_dead_${getTimeOfDay(time)}`;
  }

  this.save();
};

treeSchema.methods.updateAge = function updateAge(age, time) {
  const kindName = types.getNameByKind(this.kind);
  const level = types.getPhaseByAge(this.kind, age);
  const period = getTimeOfDay(time);

  this.age = age;
  this.image = `${kindName}_${level}_${period}`;

  this.save();
};

module.exports = mongoose.model('Tree', treeSchema);

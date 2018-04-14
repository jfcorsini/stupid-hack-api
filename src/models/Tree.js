'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

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
});

module.exports = mongoose.model('Tree', treeSchema);

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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tree', treeSchema);

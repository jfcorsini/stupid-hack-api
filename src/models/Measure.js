'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');

const measureSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  user: {
    type: String,
    ref: 'User',
  },
  weight: {
    required: true,
    type: Number,
  },
  created_at: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model('Measure', measureSchema);

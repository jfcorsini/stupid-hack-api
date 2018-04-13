'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  username: {
    required: true,
    type: String,
    index: { unique: true },
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  tree: {
    type: String,
    ref: 'Tree',
  },
});

userSchema.index({
  username: 1,
}, { unique: true });

userSchema.pre('save', function cb(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    return next();
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password)
      .then((res) => {
        if (res === false) {
          return reject(new Error('Password does not match'));
        }

        return resolve();
      })
      .catch(err => reject(err));
  });
};

module.exports = mongoose.model('User', userSchema);

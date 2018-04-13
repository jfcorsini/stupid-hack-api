'use strict';

const jwt = require('jsonwebtoken');

const createJWTToken = (settings) => {
  const session = settings.session || {};

  return jwt.sign({ session }, process.env.JWT_SECRET);
};

const verifyJWTToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error || !decoded) {
      return reject(error);
    }

    return resolve(decoded);
  });
});

module.exports = {
  createJWTToken,
  verifyJWTToken,
};

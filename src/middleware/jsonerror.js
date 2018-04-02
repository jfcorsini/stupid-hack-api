'use strict';

const http = require('../lib/http');

module.exports = (error, req, res, next) => {
  if ((error instanceof http.HttpError) === false) {
    return next(error);
  }

  return res
    .status(error.code)
    .json({ message: error.message });
};

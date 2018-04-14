'use strict';

const lib = require('./../lib');

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || undefined;

  lib.auth.verifyJWTToken(token)
    .then((decoded) => {
      req.session = decoded.session;

      next();
    })
    .catch((err) => {
      lib.logger.error('JWT is not verified: ', err.message);
      next(new lib.http.UnauthorizedHttpError(err.message));
    });
};

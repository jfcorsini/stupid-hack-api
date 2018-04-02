'use strict';

class HttpError extends Error {
  constructor(code, ...args) {
    super(...args);
    this.code = code;
  }
}

class BadRequestHttpError extends HttpError {
  constructor(...args) {
    super(400, ...args);
  }
}

class UnauthorizedHttpError extends HttpError {
  constructor(...args) {
    super(401, ...args);
  }
}

class ForbiddenHttpError extends HttpError {
  constructor(...args) {
    super(400, ...args);
  }
}

class NotFoundHttpError extends HttpError {
  constructor(...args) {
    super(404, ...args);
  }
}

class UnprocessableEntityHttpError extends HttpError {
  constructor(...args) {
    super(422, ...args);
  }
}

class InternalServerError extends HttpError {
  constructor(...args) {
    super(500, ...args);
  }
}

module.exports = {
  HttpError,
  BadRequestHttpError,
  UnauthorizedHttpError,
  ForbiddenHttpError,
  NotFoundHttpError,
  UnprocessableEntityHttpError,
  InternalServerError,
};

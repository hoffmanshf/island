class HttpException extends Error {
  constructor(message, errorCode, status) {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.status = status;
  }
}

class ParameterException extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = message || 'invalid parameter';
    this.errorCode = errorCode || 10000;
    this.status = 400;
  }
}

class Success extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = message || 'ok';
    this.errorCode = errorCode || 0;
    this.status = 201;
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || 'not found';
    this.errorCode = errorCode || 10000;
    this.status = 404;
  }
}

class AuthFailed extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = message || 'authentication failed';
    this.errorCode = errorCode || 10004;
    this.status = 401;
  }
}

class Forbidden extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = message || 'access forbidden';
    this.errorCode = errorCode || 10006;
    this.status = 403;
  }
}

class LikeError extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = 'you have liked this post';
    this.errorCode = 60001;
    this.status = 400;
  }
}

class DislikeError extends HttpException {
  constructor(message, errorCode) {
    super();
    this.message = 'you have disliked this post';
    this.errorCode = 60002;
    this.status = 400;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
  LikeError,
  DislikeError,
};

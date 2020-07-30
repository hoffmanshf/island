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

class NotFound extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'not found'
        this.errorCode = errorCode || 10000
        this.status = 404
    }
}

class AuthFailed  extends HttpException {
    constructor(message, errorCode) {
        super()
        this.message = message || 'authentication failed';
        this.errorCode = errorCode || 10004;
        this.status = 401;
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed
}

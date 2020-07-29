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

module.exports = {
    HttpException,
    ParameterException
}

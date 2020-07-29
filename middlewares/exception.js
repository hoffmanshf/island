const {HttpException} = require('../core/http-exception');

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        if (global.config.environment === 'dev' && !error instanceof HttpException) {
            throw error;
        }
        if (error instanceof HttpException) {
            ctx.body = {
                message: error.message,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.status;
        } else {
            ctx.body = {
                message: 'Unknown error',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }
    }
}
module.exports = catchError;

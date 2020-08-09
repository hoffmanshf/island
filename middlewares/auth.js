const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let errorMessage = 'token is invalid';

      if (!userToken || !userToken.name) {
        throw new global.errors.Forbidden(errorMessage);
      }

      let decodedToken;
      try {
        decodedToken = jwt.verify(
          userToken.name,
          global.config.security.secretKey
        );
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errorMessage = 'token has expired';
        }
        throw new global.errors.Forbidden(errorMessage);
      }
      if (decodedToken.scope < this.level) {
        errorMessage = 'scopes are incorrect';
        throw new global.errors.Forbidden(errorMessage);
      }

      // uid,scope
      ctx.auth = {
        uid: decodedToken.uid,
        scope: decodedToken.scope,
      };
      await next();
    };
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = {
  Auth,
};

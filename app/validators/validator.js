const { BaseValidator, Rule } = require('../../core/base-validator-v2');
const { User } = require('../models/user');
const { LoginType } = require('../lib/enum');

class PositiveIntegerValidator extends BaseValidator {
  constructor() {
    super();
    this.id = [new Rule('isInt', ' has to be integer', { min: 1 })];
  }
}

class RegisterValidator extends BaseValidator {
  constructor() {
    super();
    this.email = [new Rule('isEmail', ' has to be a valid email')];
    this.password1 = [
      new Rule('isLength', ' length has to be 6 - 32', {
        min: 6,
        max: 32,
      }),
      new Rule(
        'matches',
        ' is not valid',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      ),
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', ' length has to be 4 - 32', {
        min: 4,
        max: 32,
      }),
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('Your passwords do not match');
    }
  }

  async validateEmail(vals) {
    const { email } = vals.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error(' email already exists');
    }
  }
}

class TokenValidator extends BaseValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', ' length has to be 4 - 32', {
        min: 4,
        max: 32,
      }),
    ];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', ' length has to be 6 - 128', {
        min: 6,
        max: 128,
      }),
    ];
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type is required');
    }
    if (!LoginType.isValidType(vals.body.type)) {
      throw new Error('invalid login type');
    }
  }
}

class NotEmptyValidator extends BaseValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', 'can not be empty', {
        min: 1,
      }),
    ];
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
};

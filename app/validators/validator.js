const {BaseValidator, Rule} = require('../../core/base-validator');

class PositiveIntegerValidator extends BaseValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', ' has to be integer', {min: 1})
        ]
    }
}

class RegisterValidator extends BaseValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', ' has to be a valid email')
        ]
        this.password1 = [
            new Rule('isLength', ' length has to be 6 - 32', {
                min: 6,
                max: 32
            }),
            new Rule('matches', ' is not valid', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', ' length has to be 4 - 32', {
                min: 4,
                max: 32
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('Your passwords do not match')
        }
    }

    // async validateEmail(vals) {
    //     const email = vals.body.email
    //     const user = await User.findOne({
    //         where: {
    //             email: email
    //         }
    //     })
    //     if (user) {
    //         throw new Error(' email already exists')
    //     }
    // }

}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}

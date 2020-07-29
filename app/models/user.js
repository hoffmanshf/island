const {Sequelize, Model} = require('sequelize');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../../core/db');

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync();
            const encryptedPassword = bcrypt.hashSync(val, salt);
            // setDataValue is a function defined in Model class
            this.setDataValue('password', encryptedPassword);
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {sequelize, tableName: 'user'});

module.exports = {
    User
};

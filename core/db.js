const Sequelize = require('sequelize');
const {dbName, host, port, username, password} = require('../config/config').database;
const sequelize = new Sequelize(dbName, username, password, {
    dialect: 'mysql', host, port, logging: false, define: {
        timestamp: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscore: true
    }
});
sequelize.sync();
module.exports = {
    sequelize
}

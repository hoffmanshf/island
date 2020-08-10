const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  username,
  password,
} = require('../config/config').database;

const sequelize = new Sequelize(dbName, username, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  define: {
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'created_at'],
        },
      },
    },
  },
});
sequelize.sync({
  // if true database tables will be dropped every time application launches
  force: false,
});
module.exports = {
  sequelize,
};

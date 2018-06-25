const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://test:password@localhost/testwebsite');

module.exports = sequelize;

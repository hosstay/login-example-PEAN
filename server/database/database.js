const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://mdx:mdx@localhost:5432/mdxdb');

module.exports = sequelize;
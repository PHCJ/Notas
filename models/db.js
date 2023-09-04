const Sequelize = require('sequelize');
const sequelize = new Sequelize('lembretes_db', 'root', '',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = {sequelize, Sequelize};
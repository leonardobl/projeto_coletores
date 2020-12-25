const Sequelize = require('sequelize')
const Connection = new Sequelize( 'coletores', 'root', 'dlkt200602050', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = Connection;




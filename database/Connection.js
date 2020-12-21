const Sequelize = require('sequelize')
const Connection = new Sequelize( 'coletores', 'root', 'dlkt200602050', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = Connection;
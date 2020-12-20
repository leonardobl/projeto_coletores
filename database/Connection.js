const Sequelize = require('sequelize')
const Connection = new Sequelize( 'coletores', 'leonardo', 'dlkt200602050', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = Connection
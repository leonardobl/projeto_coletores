const Sequelize = require('sequelize')
const Connection = require('./Connection')

const Users = Connection.define('Users', {
    login: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Users.sync({force: false})

module.exports = Users
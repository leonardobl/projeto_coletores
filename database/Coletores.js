const Sequelize = require('sequelize')
const Connection = require('./Connection')

Connection.define('coletores', {
    matricula:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    numero:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    status:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})
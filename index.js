const express = require('express')
const app = express()
const Connection = require('./database/Connection')


app.use(express.static('public'))
app.set("view engine", "ejs")


Connection.authenticate().then( ()=> { 
    console.log('Conectado ao banco de dados !')
} )



app.get('/', (req, res)=> {
    res.render('index')
})



app.listen(8000, ()=> {
    console.log('SERVIDOR RODANDO !!!')
})
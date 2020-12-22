const express = require('express')
const app = express()
const Connection = require('./database/Connection')
const Users = require('./database/users')


app.use(express.static('public'))
app.set("view engine", "ejs")


Connection.authenticate().then( ()=> { 
    console.log('Conectado ao banco de dados !')
} )



app.get('/', (req, res)=> {
    res.render('index')
})

app.get('/admin/create', (req, res)=> {
    res.render('admin/create')
})

app.get('/admin/edit', (req, res)=> {
    res.render('admin/edit')
})



app.listen(8000, ()=> {
    console.log('SERVIDOR RODANDO !!!')
})
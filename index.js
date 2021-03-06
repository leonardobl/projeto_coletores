const express = require('express')
const app = express()
const Connection = require('./database/Connection')
const Users = require('./database/users')
const bcrypt = require('bcryptjs')
const bodyparser = require('body-parser')
const session = require('express-session')
const adminAuth = require('./middlewares/adminAuth')


app.use(express.static('public'))
app.set("view engine", "ejs")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(session( { secret: "magalu", cookie: { maxAge: 60000 } } ))


Connection.authenticate().then( ()=> { 
    console.log('Conectado ao banco de dados !')
} )

app.post('/user/save', (req, res)=> {
    let login = req.body.login
    login = login.toLowerCase()
    let name = req.body.name
    name = name.toLowerCase()
    let password = req.body.password
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    
    Users.findOne({ raw: false, where:{ login } }).then( user => {
        
        if(user){
            if(user.login == login || user.name == name){
                res.redirect('/admin/create')
            }
        }else{
            Users.create({ login, name, password: hash }).then( ()=> {
                res.redirect('/admin/create')
            })}
            
        } )
    })

    app.get('/user/delete/:id', (req, res)=> {
        let id = req.params.id
        Users.destroy({ where:{ id } }).then( ()=>{
            res.redirect('/admin/create')
        } )
        
    })

    
    app.get('/', (req, res)=> {
        res.render('index')
    })
    
    app.get('/admin/create', adminAuth, (req, res)=> {
        Users.findAll().then(users =>{
            res.render('admin/create', { users })
        })
    })
    
    app.get('/user/edit/:id', adminAuth, (req, res)=> {
        let id = req.params.id
        Users.findByPk(id).then( user => {
            res.render('admin/edit', { user })
        } )
    })
    
    app.post('/user/update', (req, res)=> {
        
        let id = req.body.id
        let login = req.body.login
        let name = req.body.name
        let password = req.body.password
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        Users.update({login, name, password: hash}, { where:{ id } }).then( ()=> {
            res.redirect('/admin/create')
        } )
    })
    

    app.post('/login', (req, res)=> {
        let login = req.body.login
        let password = req.body.password

        Users.findOne({ where: { login }, raw: true }).then( user =>{
            
            if(user){
                let correct = bcrypt.compareSync(password, user.password)
                
                if(correct){
                    req.session.user = {
                        id: user.id,
                        login: user.login,
                        name : user.name
                    }
                    res.render('admin/index', { user })
                }else{
                    res.redirect('/')
                }
            }else{
                res.redirect('/')
            }
        })
    })
    
    
    app.listen(8000, ()=> {
        console.log('SERVIDOR RODANDO !!!')
    })
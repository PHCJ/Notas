const express = require('express');
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars').engine
const nota = require('./models/nota')

const app = express();

app.engine('handlebars', handlebars({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    nota.findAll().then(function (nota) {
        res.render("home", { nota })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.post('/cadastrar', (req, res) => {
    nota.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }).then(() => {
        res.redirect("/")
        console.log("cadastro realizado!")
    }).catch((erro) => {
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.get('/editar/:id', (req, res) => {
    nota.findAll({ where: { 'id': req.params.id } }).then(function (nota) {
        res.render('editar',{nota})
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.post('/atualizar', (req, res) => {
    nota.update({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/")
    })
})

app.get('/excluir/:id', (req, res) => {
    nota.destroy({
        where: { 'id': req.params.id }
    }).then(() => {
        res.redirect("/")
    }).catch(function (erro) {
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})

app.listen(8082, () => console.log("Servidor iniciado em http://localhost:8082"));
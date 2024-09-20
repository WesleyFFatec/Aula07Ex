const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.get("/consulta", function(req,res){
    post.findAll().then(function(posts){
        res.render("segunda_pagina", {posts})
        console.log(posts)
    })
 
})

app.get("/editar/:id", function(req,res){
    post.findAll({where: {'id': req.params.id}}).then(
        function(posts){
            res.render("editar", {posts})
            console.log(posts)
        }
    )
})

app.post("/atualizar", function(req,res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where: {
            id: req.body.id
        }
    }).then(
        function(){
            console.log("Dados atualizados com sucesso!")
            res.render("primeira_pagina")
        }
    )
})

app.post("/exclusao/:id", function(req,res){
    post.destroy({where: {'id': req.params.id}}).then(function(){
       console.log("Dados excluídos com sucesso!")
       res.render("primeira_pagina")
    })
})

app.get("/excluir/:id", function(req,res){
    post.findAll({where: {'id': req.params.id}}).then(
        function(posts){
            res.render("excluir", {posts})
            console.log(posts)
        }
    )
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data_contato,
        observacao: req.body.observacao

    }).then(function(){
        res.redirect("/")
    }).catch(function(){
        console.log("Erro ao gravar os dados na entidade")
    })
})

app.listen(8081,function(){
    console.log("Servidor Ativo!")
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/models/Pergunta");

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch((err) => {
        console.log(err);
    });

// Informa ao Express para usar o EJS como View Engine
app.set("view engine", "ejs");

// Permite que o app aceite arquivos estáticos, como css, imagens, etc. E seta esses arquivos na pasta 'public'
app.use(express.static("public"));

// Transforma os dados do formulário em uma estrutura JS que possa ser utlizado no app
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvar_pergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("Servidor está rodando");
});
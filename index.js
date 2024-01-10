const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

// models do database
const Pergunta = require("./database/models/Pergunta");
const Resposta = require("./database/models/Resposta");

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


/**
 * Métodos GET
 */

app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC'] // ASC = Crescente ;  DESC = Descrescente ;
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.get("/perguntaRealizada", (req, res) => {
    res.render("perguntaRealizada");
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {
            res.redirect("/");
        }
    });
});


/**
 * Métodos POST
 */

app.post("/salvar_pergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/perguntaRealizada");
    });
});


app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaID = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(() => {
        res.redirect("/pergunta/" + perguntaID);
    });

});

app.listen(8080, () => {
    console.log("Servidor está rodando");
});
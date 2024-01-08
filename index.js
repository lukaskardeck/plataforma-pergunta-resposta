const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
    res.send("<h1>Formulário enviado com sucesso!</h1>" + 
            "<p>Titulo: " + titulo + "</p>" +
            "<p>Descricao: " + descricao + "</p>");
});

app.listen(8080, () => {
    console.log("Servidor está rodando");
});
const express = require("express");
const app = express();

// Informa ao Express para usar o EJS como View Engine
app.set("view engine", "ejs");

// Permite que o app aceite arquivos estáticos, como css, imagens, etc. E seta esses arquivos na pasta 'public'
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.listen(8080, () => {
    console.log("Servidor está rodando");
});
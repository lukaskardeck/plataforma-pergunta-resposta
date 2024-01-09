require("dotenv").config();

const sequelize = require("sequelize");

// Os argumentos passados em 'new sequelize()' devem ser as informações de conexão ao seu banco: nome do banco, usuario, senha, {host, sgbd}.
const connection = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

module.exports = connection;

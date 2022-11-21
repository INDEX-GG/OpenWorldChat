const { Sequelize } = require("sequelize");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

module.exports = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        dialect: "postgres"
    }
)

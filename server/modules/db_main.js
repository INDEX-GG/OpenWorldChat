const { Sequelize } = require("sequelize");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME_MAIN;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;


module.exports = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)

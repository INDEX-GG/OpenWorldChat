import {DB_HOST, DB_NAME_MAIN, DB_PASS, DB_PORT, DB_USER} from "../constants/constants";
const { Sequelize } = require("sequelize");

export default new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME_MAIN}`)

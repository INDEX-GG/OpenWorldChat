import {Sequelize} from "sequelize";
import {DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER} from "../constants/constants";


export default new Sequelize(
`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false, 
    dialectOptions: {
        statement_timeout: 1000,
    }
})

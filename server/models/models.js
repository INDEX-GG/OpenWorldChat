const sequelize = require("../modules/db");
const {DataTypes} = require("sequelize");

const Admin = sequelize.define("admin", {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin"})

const Rooms = sequelize.define("rooms", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userInfo: {type: DataTypes.JSON},
}, {tableName: "rooms"})

module.exports = {
    Admin, Rooms
}

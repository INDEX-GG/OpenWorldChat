import sequelize from "../modules/db";
import { DataTypes }  from "sequelize";

const Admin = sequelize.define("admin", {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin"})

const Rooms = sequelize.define("rooms", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userInfo: {type: DataTypes.JSON},
}, {tableName: "rooms"})

export {
    Admin, Rooms
}

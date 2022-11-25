import sequelize from "../db/dbChat";
import { DataTypes }  from "sequelize";

export const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
}, {tableName: "user" })

export const Admin = sequelize.define("admin", {
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin"})

export const Room = sequelize.define("room", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    servicesId: {type: DataTypes.INTEGER},
    servicesName: {type: DataTypes.STRING},
}, {tableName: "room"})

export const Message = sequelize.define("message", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING(550)},
    senderId: {type: DataTypes.INTEGER},
}, {tableName: "message"})



User.hasMany(Room);
Room.belongsTo(User);

Admin.hasMany(Room);
Room.belongsTo(Admin);

Room.hasMany(Message);
Message.belongsTo(Room);
import sequelize from "../db/dbMain";
import { DataTypes }  from "sequelize";

export const User = sequelize.define("user_feedback_chat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
}, {tableName: "user_feedback_chat" })

export const Admin = sequelize.define("admin_feedback_chat", {
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin_feedback_chat"})

export const Room = sequelize.define("room_feedback_chat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    servicesId: {type: DataTypes.INTEGER},
    servicesName: {type: DataTypes.STRING},
    lastMessageID: {type: DataTypes.INTEGER},
}, {tableName: "room_feedback_chat"})

export const Message = sequelize.define("message_feedback_chat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING(550)},
    senderId: {type: DataTypes.INTEGER},
}, {tableName: "message_feedback_chat"})



User.hasMany(Room);
Room.belongsTo(User);

Admin.hasMany(Room);
Room.belongsTo(Admin);

Room.hasMany(Message);
Message.belongsTo(Room);
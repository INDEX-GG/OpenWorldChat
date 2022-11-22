import sequelize from "../db/dbChat";
import { DataTypes }  from "sequelize";
import {IMessageModel} from "./IMessageModel";

// const User = sequelize.define("user", {
//     id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING},
//     lastname: {type: DataTypes.STRING},
//     patronymic: {type: DataTypes.STRING},
//     email: {type: DataTypes.STRING},
//     phone	: {type: DataTypes.STRING},
// }, {tableName: "user" })

const Admin = sequelize.define("admin", {
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin"})

// const Messages = sequelize.define("messages", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     message: {type: DataTypes.STRING}
// }, {tableName: "messages"})

const Room = sequelize.define("room", {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    userInfo: {type: DataTypes.JSON},
    messages: {type: DataTypes.JSON},
}, {tableName: "room"})


// User.hasOne(Room);
// Room.belongsTo(User);

Admin.hasMany(Room);
Room.belongsTo(Admin);

// Room.hasMany(Messages);
// Messages.belongsTo(Room);

// const createAdmin = async () => {
//     const password = await hashPassword(ADMIN_PASSWORD as string);
//     const admin = await Admin.create({email: ADMIN_EMAIL, password})
//     await admin.save();
// }


const createRoom = async (data: IMessageModel) => {
    console.log(data);
    // const room = await Room.create({id, messages})
    // await room.save();
}

export {
    // User,
    Admin,
    Room,
    createRoom,

}

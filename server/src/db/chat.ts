import sequelize from "../modules/db";
import { DataTypes }  from "sequelize";

const Admin = sequelize.define("admin", {
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
}, {tableName: "admin"})

// const Rooms = sequelize.define("rooms", {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     userInfo: {type: DataTypes.JSON},
// }, {tableName: "rooms"})

// const createAdmin = async () => {
//     const password = await hashPassword(ADMIN_PASSWORD as string);
//     const admin = await Admin.create({email: ADMIN_EMAIL, password})
//     await admin.save();
// }

export {
    Admin,
}

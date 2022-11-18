const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, ADMIN_PASSWORD} = require("./lib/constants/constants");
const express = require("express");
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

//! app mounted
const app = express();
app.use(express.json());

//! http server
// const httpServer = require("http").createServer();

const getHashPassword = async (password) => {
    return await bcrypt.hash(password, 5);
}


//!!!! bd (init)
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)
const createModels = async () => {
    const AdminModel = sequelize.define("AdminModel", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {tableName: "AdminTable"})

    // await AdminModel.sync({force: true})

    // const password = await getHashPassword(process.env.ADMIN_PASSWORD);

    // const admin = await AdminModel.create({
    //     email: process.env.ADMIN_EMAIL,
    //     password,
    // })
    // await admin.save();
    return AdminModel;
}

createModels();

const userData = async () => {
    const AdminModel = await createModels();
    const { email, password } = await AdminModel.findOne({where: {email: process.env.ADMIN_EMAIL}})
    if (email && password) {
        return {
            email,
            password,
        }
    }

}

// userData();


app.post('/auth/admin/login/', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        return res.json({error: "Некорректные данные для входа"});
    }
    const DBInfo = await userData()
    const comparePassword = bcrypt.compareSync(password, DBInfo.password);
    if (!comparePassword) {
        res.status(400);
        return res.json({error: "Некорректные данные для входа"});
    }
    if (DBInfo.email !== email) {
        res.status(400);
        return res.json({error: "Некорректные данные для входа"});
    }
    const token = JWT.sign(
        {email, password},
        process.env.SECRET_KEY,
        {expiresIn: "30m"}
    )
    return res.json({token})


});



// //! socket.io
// const io = require("socket.io")(httpServer, {
//     path: "/",
//     cors: {origin: "*"}
// });
//
// //? socket.io connection event
// io.on("connection", socket => { console.log('a user connected'); });

app.listen(8080)

// httpServer.listen(6000);

require("dotenv").config();

const express = require("express");
const http = require("http");

const PORT = process.env.PORT;
const sequelizeChat = require("./modules/db");
const sequelizeMain = require("./modules/db_main");
const {socketConnection} = require("./services/socketServices");

const app = express();

const server = http.createServer(app);
const io = require("./modules/websocket")(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//! user connect
io.on("connection", socketConnection(io));

const start = async () => {
  try {
    await sequelizeChat.authenticate();
    await sequelizeMain.authenticate();
    await sequelizeChat.sync();
    await sequelizeMain.sync();
    server.listen(PORT, () => {
      console.log(`listening on *:${PORT}`);
    });
  } catch (e) {
    throw new Error("Error connect db and start app");
  }
};

start();

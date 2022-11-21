require("dotenv").config();

const express = require("express");
const http = require("http");

const PORT = process.env.PORT;
const sequelize = require("./modules/db");
// const models = require("./models/models")

const app = express();

const server = http.createServer(app);
const io = require("./modules/websocket")(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//! user connect
io.on("connection", (socket) => {
  //!  body
  const { roomId, authToken } = socket.handshake.query;
  if (!roomId || !authToken) {
    console.log("disconnect");
    socket.disconnect();
  }
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`listening on *:${PORT}`);
    });
  } catch (e) {
    throw new Error("Error connect db and start app");
  }
};

start();

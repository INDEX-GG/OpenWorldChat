import * as express from "express";
import * as http from "http";
import * as redis from "redis";
import { Server } from "socket.io";
import SequelizeChat from "./src/modules/db";
import SequelizeMain from "./src/modules/dbMain";
import { PORT } from "./src/constants/constants";
import { socketConnection } from "./src/services/socketServices";

//? app
const app = express();

//? server
const server = http.createServer(app);

//? socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

//? redis
const client = redis.createClient();

//! admin login
app.get("/auth/admin/login", (req, res) => {
  res.send("<h1>Admin login</h1>");
});

//! socket connect
io.on("connection", socketConnection(io));

//! start expressApp
const start = async () => {
  try {
    //? connect bd;
    await SequelizeChat.authenticate();
    await SequelizeMain.authenticate();

    //? sync bd;
    await SequelizeChat.sync();
    await SequelizeMain.sync();

    server.listen(PORT, () => {
      console.log(`listening on *:${PORT}`);
    });
  } catch (e) {
    throw new Error("Error connect db and start expressApp");
  }
};

start().then();

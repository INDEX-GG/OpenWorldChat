import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";
import SequelizeChat from "./src/modules/db";
import SequelizeMain from "./src/modules/dbMain";
import { PORT } from "./src/constants/constants";
import { socketConnection } from "./src/services/socketServices";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//! user connect
io.on("connection", socketConnection(io));

const start = async () => {
  try {
    await SequelizeChat.authenticate();
    await SequelizeMain.authenticate();

    await SequelizeChat.sync();
    await SequelizeMain.sync();

    // await createAdmin()

    server.listen(PORT, () => {
      console.log(`listening on *:${PORT}`);
    });
  } catch (e) {
    throw new Error("Error connect db and start app");
  }
};

start();

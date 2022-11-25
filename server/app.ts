import { Admin } from './src/models/ModelsChat';
import * as express from "express";
import * as http from "http";
import * as cors from "cors"
import { Server } from "socket.io";
import SequelizeChat from "./src/db/dbChat";
import SequelizeMain from "./src/db/dbMain";
import { PORT } from "./src/constants/constants";
import { socketConnection } from "./src/services/socketServices";
import {apiAdminAuth} from './src/api/api';

//? app
export const app = express();

app.use(cors({
  origin: "*",
  allowedHeaders: "*",
}))
app.use(express.urlencoded())
app.use(express.json())


//? server
const server = http.createServer(app);

//? socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

//! admin login
app.post("/login", apiAdminAuth);

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

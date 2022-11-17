const app = require("express")();
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    path: "/",
    cors: {origin: "*"}
});

io.on("connection", socket => { console.log('a user connected'); });

httpServer.listen(8000);

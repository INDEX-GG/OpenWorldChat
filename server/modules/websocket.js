const { Server } = require("socket.io");
module.exports = (server) => new Server(server, {
    cors: {
        origin: "*",
    }
});

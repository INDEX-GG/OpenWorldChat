const {checkUserAuth} = require("./services");
const socketConnection = (io) => {
    return async (socket) => {
        try {
            //! query body
            const { roomId, authToken, role } = socket.handshake.query;

            //! forced disconnect
            if (!roomId || !authToken || !role) {
                io.emit("connect error", {msg: "Произошла непредвиденная ошибка, пожалуйста попробуйте позже"})
                socket.disconnect();
                return;
            }

            //! user check
            if (role === "user") {
                const isVerify = await checkUserAuth(role, roomId, authToken);
                if (!isVerify) {
                    io.emit("connect error", {msg: "Ошибка аутентификации пользователя, пожайлуста перезайдите в аккаунт"})
                    socket.disconnect()
                    return;
                }
                io.emit("user verify")
            }

            socket.on("send message", (socket) => {
                console.log(socket);
            })

            //! disconnect room
            socket.on("disconnect", () => {
                console.log(`${role} disconnected`);
            });
        } catch (e) {
            io.emit("connect error", {msg: "Произошла непредвиденная ошибка, пожалуйста попробуйте позже"})
        }
    }
}

module.exports = {
    socketConnection,
}

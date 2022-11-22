import {Server, Socket} from "socket.io";
import {IMessageModel} from "../models/IMessageModel";
import { createRoom } from "../models/ModelsChat";
import {redisClientType} from "../../app";
import {JSON} from "sequelize";

const {checkUserAuth} = require("./services");
const socketConnection = (io: Server, client: any) => {
    return async (socket: Socket) => {
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

            //! send message
            socket.on("send message", async (data: IMessageModel) => {
                console.log(data);
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

export {
    socketConnection,
}

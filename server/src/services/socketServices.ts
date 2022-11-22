import {Server, Socket} from "socket.io";
import {IMessageModel} from "../models/IMessageModel";
import { RedisClientType } from "../types/types";
import { getSendMessage } from "./services";

const {checkUserAuth} = require("./services");
const socketConnection = (io: Server, client: RedisClientType) => {
    return async (socket: Socket) => {
        //? handle error emit
        const errorEmit = (msg: string) => {
            io.emit("connect error", {msg})
            socket.disconnect();
        }

        //! MAIN LOGIC
        try {
            //? query body
            const { roomId, authToken, role } = socket.handshake.query;
            console.log(`${role} connect`)


            //! forced disconnect
            if (!roomId || !authToken || !role) {
                errorEmit("Произошла непредвиденная ошибка, пожалуйста попробуйте позже")
                return;
            }

            //! user check
            if (role === "user") {
                const isVerify = await checkUserAuth(role, roomId, authToken);

                //? user verify
                if (!isVerify) {
                    errorEmit("Ошибка аутентификации пользователя, пожайлуста перезайдите в аккаунт")
                    return;
                }

                //? user not verify
                io.emit("user verify")
            }

            //! send message
            socket.on("send message", getSendMessage(io, client))

            //! disconnect room
            socket.on("disconnect", () => {
                console.log(`${role} disconnected`);
            });
        } catch (e) {
            errorEmit("Произошла непредвиденная ошибка, пожалуйста попробуйте позже");
        }
    }
}

export {
    socketConnection,
}

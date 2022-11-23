import {Server, Socket} from "socket.io";
import {IMessageModel} from "../models/IMessageModel";
import { RedisClientType } from "../types/types";
import { getSendMessage } from "./services";
import { Room } from "../models/ModelsChat";
import { userInfo } from "os";

const {checkUserAuth} = require("./services");
const socketConnection = (io: Server, client: RedisClientType) => {
    return async (socket: Socket) => {
        //? handle error emit
        const errorEmit = (msg: string) => {
            io.emit("error", {msg})
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
        
            //! check role
            if (role === "admin" || role === "user") {
                //? user check
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

                //? admin check
                if (role === "admin") {
                    console.log("admin")
                }

                //! find room
                const room = await Room.findOne({where: {id: roomId}});
                console.log(room);

                //! send message
                socket.on("send message", getSendMessage(io, client))
            } else {
                //! not correct role
                errorEmit("Ошибка верификации пользователя ")
            }
            
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

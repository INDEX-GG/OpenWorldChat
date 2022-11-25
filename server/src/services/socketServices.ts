import { ErrorEmitFuncType } from './../types/types';
import {Server, Socket} from "socket.io";
import { findRooms, getSendMessage } from "./services";
import { RoomConnectType } from "../types/types";
import { checkUserAuth } from "./services"
import { errorMsg } from "../constants/error";


export const socketConnection = (io: Server) => {
    return async (socket: Socket) => {
        let isCreateRoom = true;
        let roomId = undefined;
        
        //? query body
        const data = socket.handshake.query;
        const { userId, authToken, role, servicesId, services_name} = data as unknown as RoomConnectType;
        const roomName = `room:userId=${userId}/servicesId=${servicesId}`;
        console.log(`${role}: ${userId} connected to room ${servicesId}`)

        //? handle error emit
        const errorEmit: ErrorEmitFuncType = (msg: string) => {
            io.in(roomName).emit("error", msg)
            socket.disconnect();
        }

        //! MAIN LOGIC
        try {

            socket.on("create room", () => {
                socket.join(roomName)
            })


            //! forced disconnect
            if (!userId || !authToken || !role) {
                errorEmit(errorMsg.error)
                return;
            }
        
            //! check role
            if (role === "admin" || role === "user") {

                //! user check
                if (role === "user") {

                    //! check services info
                    if (!servicesId || !services_name) {
                        errorEmit(errorMsg.error);
                        return;
                    }
                    //! check verify
                    const isVerify = await checkUserAuth(authToken);

                    //! user not verify
                    if (!isVerify) {
                        errorEmit(errorMsg.auth)
                        return;
                    }
                    //? user verify
                    io.in(roomName).emit("user verify")
                    console.log("user verify", isVerify);
                }

                //! admin check
                if (role === "admin") {
                    console.log("admin")
                    return;
                }

                //! find all rooms
                const room = await findRooms(io, userId, servicesId, roomName, errorEmit)

                //! error find room in db
                if (typeof room === "undefined") {
                    errorEmit(errorMsg.room)
                    return;
                };

                //! find room
                if (typeof room === "number") {
                    roomId = room;
                    isCreateRoom = false;
                }

                //! send message
                socket.on("send message", getSendMessage(io, errorEmit, isCreateRoom, data as any, roomName, roomId))
            } else {
                //! not correct role
                errorEmit("Ошибка верификации пользователя")
            }
            
            //! disconnect room
            socket.on("disconnect", () => {
                console.log(`${role} disconnected`);
            });

        } catch (e) {
            errorEmit(errorMsg.error);
        }
    }
}

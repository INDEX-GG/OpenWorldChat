import { SOCKET_ADMIN_ALL_ROOMS } from './../constants/constants';
import { ErrorEmitFuncType } from './../types/types';
import {Server, Socket} from "socket.io";
import { findRooms, getSendMessage } from "./services";
import {RoomConnectType, PaginationType} from '../types/types';
import {checkUserAuth, confirmAdminSession, getAllRooms} from './services';
import { errorMsg } from "../constants/error";


export const socketConnection = (io: Server) => {
    return async (socket: Socket) => {
        //? query body
        const data = socket.handshake.query;
        const { userId, role, servicesId, customRoomName, email, password} = data as unknown as RoomConnectType;
        const roomName = customRoomName || `room:userId=${userId}/servicesId=${servicesId}`;

        //? handle error emit
        const errorEmit: ErrorEmitFuncType = (msg: string) => {
            io.in(roomName).emit("error", msg)
            socket.leave(roomName);
            socket.disconnect();
        }

        //! connect room user
        socket.on("user connect room", () => {
            console.log("user join room");
            socket.join(roomName)
        })
        
        //! admin connect all rooms
        socket.on("connect all rooms", () => {
            console.log("admin connect all rooms")
            socket.join(SOCKET_ADMIN_ALL_ROOMS)
        })

        //! MAIN LOGIC
        try {

            //! forced disconnect
            if (!userId || !role) {
                errorEmit(errorMsg.error)
                return;
            }


            //! check role
            if (role === "admin" || role === "user") {

                //* USER
                if (role === "user") {
                    let isCreateRoom = true;
                    let roomId = undefined;
                    
                    //? query body
                    const { authToken, servicesId, services_name} = data as unknown as RoomConnectType;
                    console.log(`${role}: ${userId} connected to room ${servicesId}`)


                    //! forced disconnect
                    if (!userId || !authToken || !role || !servicesId || !services_name) {
                        errorEmit(errorMsg.error)
                        return;
                    }

                    //! check verify
                    const isVerify = await checkUserAuth(authToken);

                    //! user not verify
                    if (!isVerify) {
                        errorEmit(errorMsg.auth)
                        return;
                    }

                    //! user verify

                    io.in(roomName).emit("user verify")

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

                    //! create new room
                    if (room === true) {
                        io.in(roomName).emit("new room");
                    }

                    //! send message
                    socket.on("send message", getSendMessage(io, errorEmit, isCreateRoom, data as any, roomName, roomId))
                } else {

                }

                //* ADMIN
                if (role === "admin") {

                    //! error body
                    if (!email || !password) {
                        errorEmit(errorMsg.error)
                        return;
                    }

                    //! check auth admin
                    const isConfirm = await confirmAdminSession(email, password);
                    

                    //! error auth admin 
                    if (!isConfirm) {
                        errorEmit(errorMsg.auth);
                        return;
                    }

                    if (isConfirm) {
                        io.to(SOCKET_ADMIN_ALL_ROOMS).emit("admin confirm")
                    }

                    //! all rooms
                    socket.on("pagination rooms", ({page, pageLimit}: PaginationType) => {
                        getAllRooms(io, errorEmit, page, pageLimit)
                    })

                    return;
                }

            } else {
                //! not correct role
                errorEmit(errorMsg.auth)
            }
            
            //! disconnect room
            socket.on("disconnect", () => {
                console.log(`${role} disconnected`);
                errorEmit(errorMsg.leave)
            });

        } catch (e) {
            errorEmit(errorMsg.error);
        }
    }
}

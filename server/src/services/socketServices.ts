import { ErrorEmitFuncType } from './../types/types';
import {Server, Socket} from "socket.io";
import { findRooms, getSendMessage } from "./services";
import {RoomConnectType, PaginationType} from '../types/types';
import {checkUserAuth, confirmAdminSession, getAllRooms} from './services';
import { errorMsg } from "../constants/error";


export const socketConnection = (io: Server) => {
    return async (socket: Socket) => {
        //? query body
        const querySocket = socket.handshake.query;
        const { userId, role, servicesId, customRoomName, email, password} = querySocket as unknown as RoomConnectType;
        const roomName = customRoomName || `room:userId=${userId}/servicesId=${servicesId}`;

        //? handle error emit
        const errorEmit: ErrorEmitFuncType = (msg: string) => {
            console.log(roomName, msg);
            io.in(roomName).emit("error", msg)
            socket.leave(roomName);
            socket.disconnect();
        }

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
                    const { authToken, servicesId, services_name} = querySocket as unknown as RoomConnectType;
                    console.log(`${role}: ${userId} connected to room ${servicesId}`)


                    //? USER - CURRENT ROOM
                    //! connect room user
                    socket.on("user connect room", () => {
                        console.log("user join room");
                        socket.join(roomName)
                    })
                    //? USER - CURRENT ROOM


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


                    //! room is find
                    if (room?.id) {
                        roomId = room.id;
                        isCreateRoom = false;
                    }

                    //! create new room
                    if (room === true) {
                        io.in(roomName).emit("new room");
                    }

                    //! send message
                    socket.on(
                        "send message", 
                        getSendMessage(
                            io, 
                            errorEmit, 
                            isCreateRoom, 
                            querySocket as any, 
                            roomName, 
                            room
                        )
                    )
                } else {

                }

                //* ADMIN
                if (role === "admin") {


                    //? ADMIN - ALL ROOM
                    //! admin connect all rooms
                    socket.on("admin connect all rooms", () => {
                        socket.join(roomName)
                    })

                    //! admin leave all room
                    socket.on("admin leave all room", () => {
                        //! re-open browser tab
                        socket.leave(roomName);
                        socket.join(roomName)
                    })
                    //? ADMIN - ALL ROOM
                    

                    //? ADMIN - CURRENT ROOM
                    //! admin connect to current room
                    socket.on("admin connect current rooms", () => {
                        socket.join(roomName)
                    })
                    //? ADMIN - CURRENT ROOM


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
                        io.to(roomName).emit("admin confirm")
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

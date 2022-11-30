import { IRoomModel } from './../types/IRoomModel';
import { Server } from 'socket.io';
import {UserTokensAll, UserTokensBlackList} from "../models/ModelsMain";
import { IMessageModel } from "../types/IMessageModel";
import {User, Room, Message, Admin} from '../models/ModelsChat';
import { ErrorEmitFuncType, RoomConnectType } from '../types/types';
import { errorMsg } from "../constants/error";
import {ADMIN_ALL_ROOM_NAME} from '../constants/constants';
import * as bcrypt from 'bcrypt';
import {decryptedData} from '../api/api';
import { Console } from 'console';

export const confirmAdminSession = async (email: string, password: string) => {
    try {
        const admin = await Admin.findOne({where: {email: decryptedData(email)}})
        return bcrypt.compare(decryptedData(password), admin?.dataValues.password)
    } catch(e) {
        return false
    }
}

export const checkUserAuth = async (authToken: string) => {
    try {
        //! find authToken in all refresh tokens
        const findTokenAll = await UserTokensAll.findOne({where: {token: authToken}});
        if (typeof findTokenAll?.dataValues === "object") {
            //! get token id
            const {dataValues: {id: tokenId}} = findTokenAll;
            //! find token in blacklist
            const findBlackListToken = await UserTokensBlackList.findOne({where: {token_id: tokenId}})
            //? null = true; object = false;
            return !findBlackListToken
        }
        return false;
    } catch (e) {
        return false;
    }
}

export const findRooms = async (io: Server, userId: number, servicesId: number, roomName: string, errorEmit: ErrorEmitFuncType) => {
    try {
        //! find all room
        const userRooms = await Room.findAll({where: {userId: userId}});


        //! correct connect to db
        if (Array.isArray(userRooms)) {
            //! empty rooms
            if (userRooms.length === 0) {
                return true;
            }

            //! find room in rooms
            const currentRoom = userRooms.find(room => room.dataValues.servicesId == servicesId)?.dataValues

            //! find room - false
            if (!currentRoom) {
                console.log("create room");
                return true;
            }
            
            if (currentRoom) {
                //! get message in room;
                const messages = await Message.findAll({where: {roomId: currentRoom.id}})

                if (messages) {
                    const messageArray = messages.map(message => message.dataValues);
                    //! event frontend message list
                    io.in(roomName).emit("message list", messageArray);
                    return currentRoom;
                }
            }

            return undefined;
        }
        return undefined;
    } catch(e) {
        return undefined;
    }
}

const createRoom = async (
    io: Server, 
    querySocket: RoomConnectType, 
    data: IMessageModel, 
    roomName: string,
    errorEmit: ErrorEmitFuncType, 
    tryCount = 0
) => {
    try {
        const { userInfo } = data;
        //! create user
        const findUser = await User.findOne({where: {id: userInfo.id}})
        if (!findUser) {
            const user = await User.create({
                id: userInfo.id,
                name: userInfo.name || "",
                lastname: userInfo.lastname || "",
                patronymic: userInfo.patronymic || "",
                email: userInfo.email,
                phone: userInfo.phone || "",
            })
            await user.save();
            console.log("user create");
        }
        //! create room
        const room = await Room.create({
            servicesId: querySocket.servicesId,
            servicesName: querySocket.services_name,
            userId: userInfo.id,
            adminId: 999999,
        });
        console.log("room create");
        await room.save()
        return room;
    } catch(e) {
        tryCount += 1;
        //! try create
        if (tryCount > 0 && tryCount  <= 5) {
            createRoom(io, querySocket, data, roomName, errorEmit, tryCount);
        } else {
            //! error create room
            errorEmit(errorMsg.room);
            return false;
        }
    }
}

const createMessage = async (
    io: Server, 
    errorEmit: ErrorEmitFuncType,
    roomName: string, 
    messageInfo: IMessageModel,
    roomInfo: IRoomModel,
) => {
    try {
        const message = await Message.create({
            roomId: messageInfo.roomId,
            text: messageInfo.message,
            senderId: messageInfo.userInfo.id,
        })
        await message.save();

        //! emit frontend user chat (mobile)
        io.in(roomName).emit("message save", message.dataValues);

        //! get current room
        const room = await Room.findOne({where: {id: roomInfo.id}, include: [{model: Message, limit: 0}, {model: User}]})
        //! emit frontend admin chat (website)
        io.in(ADMIN_ALL_ROOM_NAME).emit("message get admin", room);
        
        return true;
    } catch(e) {
        console.log(e);
        errorEmit(errorMsg.message);
        return false;
    }
}


//? event send message
export const getSendMessage = (
    io: Server, 
    errorEmit: ErrorEmitFuncType, 
    isCreateRoom: boolean, 
    querySocket: RoomConnectType, 
    roomName: string,
    roomInfo?: IRoomModel,
) => {
    return async (message: IMessageModel) => {
        //! Main logic
        try {
            if (message.userInfo.id) {
                //! If room not found room
                if (isCreateRoom) {
                    //! create new room;
                    createRoom(io, querySocket, message, roomName, errorEmit).then((newRoom) => {
                        if (newRoom) {
                            isCreateRoom = false,
                            roomInfo = newRoom.dataValues;
                            createMessage(
                                io, 
                                errorEmit, 
                                roomName, 
                                {...message, roomId: newRoom.dataValues.id}, 
                                newRoom as any,
                            );
                        }
                    })
                } else {
                    //! create message
                    if (roomInfo) {
                        createMessage(
                            io, 
                            errorEmit, 
                            roomName, 
                            {...message, roomId: roomInfo.id}, 
                            roomInfo,
                            );
                    } else {
                        errorEmit(errorMsg.message)
                    }
                }
            } else {
                throw new Error("")
            }
        } catch(e) {
            errorEmit(errorMsg.message)
        }
    }
}


export const getAllRooms = async (
    io: Server, 
    errorEmit: ErrorEmitFuncType, 
    page: number,
    pageLimit: number,
) => {
    try {
        const allRooms = await Room.findAndCountAll({
            offset: (page - 1) * pageLimit, 
            limit: pageLimit, 
            include: [{model: Message, limit: 0}, {model: User}],
        })
        
        io.in(ADMIN_ALL_ROOM_NAME).emit("admin get all rooms", allRooms.rows)
    } catch(e) {
        errorEmit(errorMsg.rooms)
    }
}
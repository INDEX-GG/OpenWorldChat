import { Server } from 'socket.io';
import {UserTokensAll, UserTokensBlackList} from "../models/ModelsMain";
import { IMessageModel } from "../types/IMessageModel";
import { User, Room, Message } from "../models/ModelsChat";
import { ErrorEmitFuncType, RoomConnectType } from '../types/types';
import { errorMsg } from "../constants/error";

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
                    return currentRoom.id as number;
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
    connectData: RoomConnectType, 
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
            servicesId: connectData.servicesId,
            servicesName: connectData.services_name,
            userId: userInfo.id,
            adminId: 1,
        });
        console.log("room create");
        await room.save()
        return room;
    } catch(e) {
        tryCount += 1;
        //! try create
        if (tryCount > 0 && tryCount  <= 5) {
            createRoom(io, connectData, data, roomName, errorEmit, tryCount);
        } else {
            //! error create room
            errorEmit(errorMsg.room);
            return false;
        }
    }
}

const createMessage = async (
    io: Server, 
    roomName: string, 
    data: IMessageModel,
    errorEmit: ErrorEmitFuncType,
) => {
    try {
        const message = await Message.create({
            roomId: data.roomId,
            text: data.message,
            senderId: data.userInfo.id,
        })
        await message.save();

        delete message.dataValues.updatedAt;
        //! emit frontend
        io.in(roomName).emit("message save", message.dataValues);
        return true;
    } catch(e) {
        errorEmit(errorMsg.message);
        return false;
    }
}


//? event send message
export const getSendMessage = (
    io: Server, 
    errorEmit: ErrorEmitFuncType, 
    isCreateRoom: boolean, 
    connectData: RoomConnectType, 
    roomName: string,
    roomId?: number,
) => {
    return async (data: IMessageModel) => {
        //! Main logic
        try {
            if (data.userInfo.id) {
                //! If room not found room
                if (isCreateRoom) {
                    //! create new room;
                    createRoom(io, connectData, data, roomName, errorEmit).then((room) => {
                        if (room) {
                            isCreateRoom = false,
                            roomId = room.dataValues.id;
                            createMessage(io, roomName, {...data, roomId: room.dataValues.id}, errorEmit);
                        }
                    })
                } else {
                    //! create message
                    if (roomId) {
                        createMessage(io, roomName, {...data, roomId: roomId}, errorEmit);
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
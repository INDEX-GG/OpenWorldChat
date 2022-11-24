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

export const findRooms = async (io: Server, userId: number, servicesId: number) => {
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

            console.log(currentRoom);

            return false;

        }
        return false;
    } catch(e) {
        io.emit("error", errorMsg.room);
        return undefined;
    }
}

const createRoom = async (io: Server, connectData: RoomConnectType, data: IMessageModel, tryCount = 0) => {
    try {
        const { userInfo } = data;
        //! create user
        const user = await User.create({
            id: userInfo.id,
            name: userInfo.name || "",
            lastname: userInfo.lastname || "",
            patronymic: userInfo.patronymic || "",
            email: userInfo.email,
            phone: userInfo.phone || "",
        })
        console.log("user create");
        await user.save();
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
            createRoom(io, connectData, data, tryCount);
        } else {
            //! error create room
            io.emit("error", errorMsg.room);
            return false;
        }
    }
}

const createMessage = async (io: Server, data: IMessageModel) => {
    try {
        const message = await Message.create({
            text: data.message,
            senderId: data.userInfo.id,
        })
        await message.save();

        delete message.dataValues.updatedAt;
        //! emit frontend
        io.emit("message save", message.dataValues);
        return true;
    } catch(e) {
        io.emit("error", errorMsg.message);
        return false;
    }
}


//? event send message
export const getSendMessage = (io: Server, errorEmit: ErrorEmitFuncType, isCreateRoom: boolean, connectData: RoomConnectType) => {
    return async (data: IMessageModel) => {
        //! get room data
        const getRoomData = (): IMessageModel => data
        console.log("send message");

        //! Main logic
        try {
            if (data.userInfo.id) {
                //! If room not found room
                if (isCreateRoom) {
                    //! create new room;
                    const roomData = getRoomData();
                    createRoom(io, connectData, roomData).then((room) => {
                        if (room) {
                            console.log(room.dataValues.id)
                            isCreateRoom = false,
                            createMessage(io, roomData);
                            return;
                        }
                    })
                } else {
                    //! create message
                    createMessage(io, getRoomData());
                }
            } else {
                throw new Error("")
            }
        } catch(e) {
            io.emit("error", errorMsg.message)
        }
    }
}
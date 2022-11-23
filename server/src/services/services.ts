import { Server } from 'socket.io';
import {UserTokensAll, UserTokensBlackList} from "../models/ModelsMain";
import { IMessageModel } from "../models/IMessageModel";
import { RedisClientType } from "../types/types";
import { User, Room, } from "../models/ModelsChat";

const checkUserAuth = async (role: string, roomId: number, authToken: string) => {
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

const saveMessagePostgress = async (data: IMessageModel) => {
    try {
        console.log(data);
    } catch(e) {
        console.log('123');
    }
};

//? event send message
const getSendMessage = (io: Server, client: RedisClientType) => {
    return async (data: Omit<IMessageModel, "roomId">) => {
        const getRoomData = (): IMessageModel => ({roomId: data.userInfo.id, ...data})

        try {
            if (data.userInfo.id) {
                console.log("send");
            }
            // //? dynamic room key
            // const roomKey = `room${data.userInfo.id}`;
            // //? dynamic room data
            // const roomData = JSON.stringify(getRoomData());
            // //? messageId
            // const messageId = await client.RPUSH(roomKey, roomData);
            // //? check save in redis
            // if (typeof messageId === "number") {
            //     //? get last message
            //     const chatData = await client.LRANGE(roomKey, -1, -1);
            //     if (Array.isArray(chatData)) {
            //         const parseChatData = JSON.parse(chatData[0]) as IMessageModel;
            //         io.emit("success message", parseChatData);
            //         // client.EXPIRE(roomKey, 15);
            //     }
            // }
        } catch(e) {
            //? not save redis 
            // const roomData = getRoomData();
            // saveMessagePostgress(roomData);
        }
    }
}

export {
    checkUserAuth,
    getSendMessage,
}

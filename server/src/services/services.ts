import { Server } from 'socket.io';
import {UserTokensAll, UserTokensBlackList} from "../models/ModelsMain";
import { IMessageModel } from "../models/IMessageModel";
import { RedisClientType } from "../types/types";

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

//? event send message
const getSendMessage = (io: Server, client: RedisClientType) => {
    return async (data: IMessageModel,) => {
        //? dynamic room key
        const roomKey = `room${data.userInfo.id}`;
        //? dynamic room data
        const roomData = JSON.stringify({roomId: data.userInfo.id,...data});
        const messageId = await client.RPUSH(roomKey, roomData);
        //? check save in redis
        if (typeof messageId === "number") {
            //? get last message
            const chatData = await client.LRANGE(roomKey, -1, -1);
            if (Array.isArray(chatData)) {
                io.emit("success message", JSON.parse(chatData[0]));
            }
        }
    }
}

export {
    checkUserAuth,
    getSendMessage,
}

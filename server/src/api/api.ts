import { IUserModel } from './../types/IUserModel';
import { Room, Message, User } from './../models/ModelsChat';
import { SECRET_KEY } from './../constants/constants';
import { Request, Response } from 'express';
import * as CryptoJS from "crypto-js"
import {confirmAdminSession} from '../services/services';
import {UserChangeType} from '../types/types';

export const decryptedData = (data: string) => CryptoJS.AES.decrypt(data, SECRET_KEY as string).toString(CryptoJS.enc.Utf8);

const apiResponse = (res: Response) => {
    return (code: number, data: object) => {
        res.status(code)
        return res.json(data)
    }
}

export const checkAdminSession = async (res: Response, email: string, password: string) => {
    const api = apiResponse(res);
    try {
        const isPassword = await confirmAdminSession(email, password);

        //! error password
        if (!isPassword) {
            return api(404, {msg: "Некорректные данные"})
        }

        return isPassword;
    } catch {
        return api(400, {msg: "Ошибка запроса"})
    }
}

export const apiAdminAuth = async (req: Request, res: Response) => {
    const api = apiResponse(res);
    try {
      const {email, password} = req.body;
  
      //! error body
      if (!email || !password) {
        return api(400, {msg: "Ошибка тела"})
      }
      
      const isAdmin = await checkAdminSession(res, email, password);

      if (isAdmin) {
        return api(200, {isAuth: true})
      }

    } catch {}
  }

  export const apiAdminChat = async (req: Request, res: Response) => {
    const api = apiResponse(res);
    try {
      const {email, password, id: adminId} = req.body;
      const { id: roomId } = req.params
  
      //! error body
      if (!email || !password || !adminId ) {
        return api(400, {msg: "Ошибка тела запроса"})
      }
      
      const isAdmin = await checkAdminSession(res, email, password);

      if (isAdmin) {
        const room = await Room.findOne({where: {id:roomId}, include: [{model: Message, limit: 0}, {model: User}]})
        if (room) {
          return api(200, room.dataValues)
        } else {
        return api(400, {msg: "Ошибка получения комнаты"})
        }
      } else {
        return api(400, {msg: "Ошибка авторизации"})
     
      }

    } catch {}
  }

  export const apiUserChange = async (req: Request, res: Response) => {
    const api = apiResponse(res);
    try {
      const { id, ...otherUserInfo } = req.body as unknown as UserChangeType;
      console.log(req.body)

      const findUser = await User.findOne({where: {id}})

      if (findUser && typeof otherUserInfo === "object") {
        await findUser.update(otherUserInfo, {where: {id}})
        await findUser.save();
        api(200, {msg: "success"})
      } else {
        api(404, {msg: "User not found"})
      }
    } catch(e) {
      console.log(e);
    };
  }
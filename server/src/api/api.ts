import { SECRET_KEY } from './../constants/constants';
import { Request, Response } from 'express';
import * as CryptoJS from "crypto-js"
import {confirmAdminSession} from '../services/services';

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
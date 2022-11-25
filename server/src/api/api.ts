import { SECRET_KEY } from './../constants/constants';
import { Request, Response } from 'express';
import {Admin} from '../models/ModelsChat';
import * as bcrypt from "bcrypt"
import * as CryptoJS from "crypto-js"

const decryptedData = (data: string) => CryptoJS.AES.decrypt(data, SECRET_KEY as string).toString(CryptoJS.enc.Utf8);

const apiResponse = (res: Response) => {
    return (code: number, data: object) => {
        res.status(code)
        return res.json(data)
    }
}

const checkAdminSession = async (res: Response, email: string, password: string) => {
    const api = apiResponse(res);
    try {
        const admin = await Admin.findOne({where: {email}})
        const isPassword = await bcrypt.compare(password, admin?.dataValues.password)

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
      
      const isAdmin = await checkAdminSession(res, decryptedData(email), decryptedData(password));

      if (isAdmin) {
        return api(200, {isAuth: true})
      }

    } catch {}
  }
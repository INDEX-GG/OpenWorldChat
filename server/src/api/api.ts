import { Request, Response } from 'express';
import {Admin} from '../models/ModelsChat';
import * as bcrypt from "bcrypt"

const checkAdminSession = async (res: Response, email: string, password: string) => {
    const admin = await Admin.findOne({where: {email}})

    //! error email
    if (!admin) {
      return apiError(res, 404, "Некорректные данные")
    }

    const isPassword = await bcrypt.compare(password, admin?.dataValues.password)

    if (!isPassword) {
      return apiError(res, 404, "Некорректные данные")
    }

    return isPassword;
}

const apiError = (res: Response, code: number, msg: string) => {
    res.status(code)
    return res.json({msg: msg})
}

export const apiAdminAuth = async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body;
  
      //! error body
      if (!email || !password) {
        apiError(res, 400, "Ошибка тела")
      }

      const isAdmin = await checkAdminSession(res, email, password);

      if (isAdmin) {
        return res.json({isAuth: true})
      } else {
        return apiError(res, 400, "Ошибка входа")
      }

    } catch(e) {
      //! error api
      return apiError(res, 400, "Ошибка api")
    }
  }
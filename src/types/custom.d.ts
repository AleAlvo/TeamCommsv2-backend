import { UserData } from 'models/db.models'
import { Request } from 'express'
export interface IGetUserAuthInfoRequest extends Request {
  user: UserData // or any other type
}
declare global {
  namespace Express {
    interface Request {
      user?: UserData // Assuming `user` is of type `User`, adjust as necessary
    }
  }
}

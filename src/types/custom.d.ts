import { UserData } from '../models/user'

declare global {
  namespace Express {
    interface Request {
      user?: UserData // Assuming `user` is of type `User`, adjust as necessary
    }
  }
}

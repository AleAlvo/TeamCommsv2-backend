import { User } from '../models/db.models'

declare global {
  namespace Express {
    interface Request {
      user?: User // Assuming `user` is of type `User`, adjust as necessary
    }
  }
}

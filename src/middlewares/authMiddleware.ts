import { Request, Response, NextFunction } from 'express'
import { supabase } from '../supabaseClient'

// authMiddleware function: Asynchronously checks if the user is authenticated
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]

  // If no token is provided, send a 401 response
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Attempt to retrieve the user data using the provided token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  // If an error occurs during user retrieval, send a 401 response
  if (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = user
  next()
}

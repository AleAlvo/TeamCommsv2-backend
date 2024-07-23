import { Request, Response, NextFunction } from 'express'
import { createClient } from '@supabase/supabase-js'
import { getUserDataById } from '../db/userRepository'
import { UserData } from '../models/db.models'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log('Authenticated User:', user)
  console.log('Incoming request:', req.method, req.path)

  const token = req.headers.authorization?.split(' ')[1]
  console.log('Extracted Token:', token)

  if (!token) {
    console.log('No token found')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data, error } = await supabase.auth.getUser(token)
  console.log('Supabase Response:', { data, error })

  if (error || !data.user) {
    console.log('Supabase Auth Error:', error?.message)
    return res.status(401).json({ error: 'Unauthorized' })
  }

  console.log('Authenticated User:', data.user)

  // Fetch detailed user data from Supabase database
  const userData: UserData | null = await getUserDataById(data.user.id)

  if (!userData) {
    console.log('User not found in the database')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Attach user data to request object
  req.user = userData

  next()
}

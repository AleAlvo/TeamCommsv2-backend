import { Request, Response, NextFunction } from 'express'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Fetch user details from the database
  const { data: user, error: userError } = await supabase
    .from('Users')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = user // Attach the user object to req

  next()
}

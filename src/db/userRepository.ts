import { createClient } from '@supabase/supabase-js'
import { UserData } from 'models/db.models'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export const getUserDataById = async (
  userId: string,
): Promise<UserData | null> => {
  const { data, error } = await supabase
    .from('users') // Make sure 'users' is your table name
    .select('id, created_at, email, password, name, subteam, role, team_id')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user data:', error)
    return null
  }

  return data || null
}

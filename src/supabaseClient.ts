import { createClient } from '@supabase/supabase-js'

// Retrieve environment variables
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_PUBLIC_KEY || ''

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

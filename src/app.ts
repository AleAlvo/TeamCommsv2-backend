import express from 'express'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Ensure dotenv is configured before using process.env
dotenv.config()

// Retrieve environment variables
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('your-table').select('*')
  if (error) return res.status(500).send(error.message)
  res.json(data)
})

export default app

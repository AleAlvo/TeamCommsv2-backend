import express from 'express'
import authRoutes from './routes/auth'
import homeRoutes from './routes/home'
import eventRoutes from './routes/event'
import dotenv from 'dotenv'
import { supabase } from './supabaseClient'

// Ensure dotenv is configured before using process.env
dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/home', homeRoutes)
app.use('/api/events', eventRoutes)

// In this example, we have a simple Express server that uses the Supabase client to interact with a database table.
// The server listens on the specified port and has a route that retrieves all records from a table.
// The server also has an auth route that handles sign-up and sign-in requests.
// The auth route uses the Supabase client to interact with the Supabase Auth service.

app.get('/', async (req, res) => {
  const { data, error } = await supabase.from('your-table').select('*')
  if (error) return res.status(500).send(error.message)
  res.json(data)
})

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app

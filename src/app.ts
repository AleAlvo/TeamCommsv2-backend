import express from 'express'
import authRoutes from './routes/authRoutes'
import homeRoutes from './routes/homeRoutes'
import eventRoutes from './routes/eventsRoutes'
import dotenv from 'dotenv'

// Ensure dotenv is configured before using process.env
dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/home', homeRoutes)
app.use('/api/events', eventRoutes)

export default app

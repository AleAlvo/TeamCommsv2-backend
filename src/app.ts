import express from 'express'
import authRoutes from './routes/authRoutes'
import homeRoutes from './routes/homeRoutes'
import eventRoutes from './routes/eventsRoutes'

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/home', homeRoutes)
app.use('/api/events', eventRoutes)

export default app

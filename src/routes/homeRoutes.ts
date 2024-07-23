import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

// Protected homepage route
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the homepage', user: req.user })
})

// Other protected routes can go here
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', user: req.user })
})

export default router

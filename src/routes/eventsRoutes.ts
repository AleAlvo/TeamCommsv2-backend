import express from 'express'
import { roleMiddleware } from '../middlewares/roleMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventControllers'

const router = express.Router()

// Middleware to ensure user is authenticated
router.use(authMiddleware)

// Middleware to ensure user has the appropriate role
// Only superadmin, admin and coach can use these routes
router.use(roleMiddleware(['superadmin', 'admin', 'coach']))

router.post('/events', createEvent) // Create event
router.put('/events/:id', updateEvent) // Update event
router.delete('/events/:id', deleteEvent) // Delete event

export default router

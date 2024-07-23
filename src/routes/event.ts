import { Router } from 'express'
import { createEvent } from '../controllers/eventControllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/', authMiddleware, createEvent)

export default router

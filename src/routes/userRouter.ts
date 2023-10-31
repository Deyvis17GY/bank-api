import express from 'express'
import asyncHandler from 'express-async-handler'
import { createUser, loginUser } from '../service/userService'

const router = express.Router()

router.post('/register', asyncHandler(createUser))
router.post('/login', asyncHandler(loginUser))

export { router as userRoutes }

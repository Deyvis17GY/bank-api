import bodyParser from 'body-parser'
import type { Request, Response } from 'express'
import express from 'express'
import { userRoutes } from './routes/userRouter'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.disable('x-powered-by')
app.use(express.json())
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Express JS' })
})

app.use('/', userRoutes)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app

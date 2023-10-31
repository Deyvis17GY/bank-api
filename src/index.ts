import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import type { Port } from './types'

const PORT: Port =
  process.env.PORT !== undefined ? Number(process.env.PORT) : 3000

const main = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
}

main()

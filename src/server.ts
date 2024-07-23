import dotenv from 'dotenv'
dotenv.config() // Load environment variables before anything else
import app from './app'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

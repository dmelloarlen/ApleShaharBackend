import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import complaintsRoutes from './routes/complaintsRoutes.js';

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/test", testRoutes)
app.use("/api/auth", authRoutes)
app.use('/api/complaints', complaintsRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
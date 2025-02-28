import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./infrastructure/database/connection";
import authRoute from './interface/routers/authRoute'
import { errorHandler } from "./shared/utils/errorHandler";
import cors from 'cors'

const app = express()
app.use(express.json())
connectDB()
const PORT = process.env.PORT || 3000
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST','PUT','PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));
app.use("/", authRoute)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
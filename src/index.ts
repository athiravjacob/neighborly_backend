import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./infrastructure/database/connection";
import { errorHandler } from "./shared/utils/errorHandler";
import cors from 'cors'
import setupAuthRoutes from "./presentation/routers/authRoute";
import { Container } from "./di/container";

const app = express()
app.use(express.json())
connectDB()
const PORT = process.env.PORT || 3000
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST','PUT','PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}));
  
app.use('/auth', setupAuthRoutes(Container.authController));

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
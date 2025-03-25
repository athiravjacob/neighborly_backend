import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./infrastructure/database/connection";
import { errorHandler } from "./shared/utils/errorHandler";
import cors from 'cors'
import setupAuthRoutes from "./presentation/routers/authRoute";
import { Container } from "./di/container";
import { AppError } from "./shared/utils/errors";
import setupNeighborRoutes from "./presentation/routers/neighborRoute";

const app = express()
app.use(express.json())
connectDB()
const PORT = process.env.PORT 
if (!PORT) throw new AppError(500, "port not available")

app.use(cors({
    origin: process.env.ORGIN_URI, 
    methods: ['GET', 'POST','PUT','PATCH'], 
  // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}));
  
app.use('/auth', setupAuthRoutes(Container.authController));
app.use('/neighbor', setupNeighborRoutes(Container.neighborController));
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
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
import setupTaskToutes from "./presentation/routers/taskRoute";
import setupUserRoutes from "./presentation/routers/userRoute";
import cookieParser from 'cookie-parser';
import verifyToken from "./presentation/middleware/authMiddleware";

const app = express()
app.use(cors({
  origin: process.env.ORGIN_URI,
  credentials: true,

  methods: ['GET', 'POST', 'PUT', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}));


connectDB()
const PORT = process.env.PORT 
if (!PORT) throw new AppError(500, "port not available")
app.use(cookieParser());



app.use(express.json())


app.use('/auth', setupAuthRoutes(Container.authController));
app.use('/neighbor', verifyToken(['neighbor']), setupNeighborRoutes(Container.neighborController));
app.use('/task', verifyToken(['user', 'neighbor']), setupTaskToutes(Container.taskController));
app.use('/user', verifyToken(['user']), setupUserRoutes(Container.userController));
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
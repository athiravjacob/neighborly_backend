import express from "express";
import http from 'http';
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
import setupAdminRoutes from "./presentation/routers/adminRoute";
import { initSocketServer } from "./infrastructure/socket/socketServer";
import setupMessageRoutes from "./presentation/routers/messageRoute";
import setupPaymentRoutes from "./presentation/routers/paymentRoute";

const app = express()
const server = http.createServer(app);
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

app.use('/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json())


app.use('/auth', setupAuthRoutes(Container.authController));
app.use('/neighbors', setupNeighborRoutes(Container.neighborController));
app.use('/tasks', setupTaskToutes(Container.taskController));
app.use('/users',verifyToken(['user']), setupUserRoutes(Container.userController));
app.use('/admins', setupAdminRoutes(Container.adminController));
app.use("/messages", setupMessageRoutes(Container.messageController));
app.use("/payments", setupPaymentRoutes(Container.paymentController))

app.use(errorHandler)

initSocketServer(server);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
import { Routes } from "./shared/constants/routes";
import morgan from "morgan";
import setupCategoryRoutes from "./presentation/routers/categoryRoute";
import setupDisputeRoutes from "./presentation/routers/disputeRoute";

const app = express()
const server = http.createServer(app);
app.use(cors({
  origin: process.env.ORGIN_URI,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}));
app.use(morgan('dev'));

connectDB()
const PORT = process.env.PORT 
if (!PORT) throw new AppError(500, "port not available")
app.use(cookieParser());

app.use(`${Routes.PAYMENTS.BASE}${Routes.PAYMENTS.WEBHOOK}`, express.raw({ type: 'application/json' }));
app.use(express.json())

app.get(Routes.HEALTH, (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(Routes.AUTH.BASE, setupAuthRoutes(Container.authController));
app.use(Routes.NEIGHBORS.BASE, setupNeighborRoutes(Container.neighborController));
app.use(Routes.TASKS.BASE, setupTaskToutes(Container.taskController));
app.use(Routes.USERS.BASE, setupUserRoutes(Container.userController));
app.use(Routes.ADMIN.BASE,verifyToken(['admin'],Container.checkUserBanStatusUsecase) ,setupAdminRoutes(Container.adminController));
app.use(Routes.MESSAGES.BASE, setupMessageRoutes(Container.messageController));
app.use(Routes.PAYMENTS.BASE, setupPaymentRoutes(Container.paymentController));
app.use(Routes.CATEGORY.BASE, setupCategoryRoutes(Container.categoryController))
app.use(Routes.DISPUTES.BASE,setupDisputeRoutes(Container.disputeController))


app.use(errorHandler)

initSocketServer(server);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

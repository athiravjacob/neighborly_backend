import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./infrastructure/database/connection";
import userRoute from './interface/routers/userRoute'
import { errorHandler } from "./shared/utils/errorHandler";

const app = express()
app.use(express.json())
connectDB()
const PORT = process.env.PORT || 3000

app.use("/", userRoute)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "./responseHandler";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction):void => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    
    errorResponse(res,statusCode,message)
}
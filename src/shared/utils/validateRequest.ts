import { Request, Response, NextFunction, response } from "express";
import { ObjectSchema } from "joi";
import { errorResponse } from "./responseHandler";
import { Schema } from "mongoose";

export const validateRequest = (Schema: ObjectSchema): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) : void => {
        const { error } = Schema.validate(req.body, { abortEarly: false })
        if (error) {
            const errorMessages = error.details.map(details => details.message)
            errorResponse(res, 400, errorMessages.join(''))
            return
        }
        next()
    }
    
}
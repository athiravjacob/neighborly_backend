// middleware/validation.ts
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorResponse } from "./responseHandler";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
      errorResponse(res, 400, errorMessages.join(", ")); 
      return;
    }
    next();
  };
};
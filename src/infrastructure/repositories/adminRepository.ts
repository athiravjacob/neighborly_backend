import { Error } from "mongoose";
import { Admin } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/interface/repositories/IAdminRepository";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";
import { AppError } from "../../shared/utils/errors";
import { adminModel } from "../model/adminModel";
import { errorResponse } from "../../shared/utils/responseHandler";

export class AdminRepository implements IAdminRepository {
    async fetchAdmin(email: string, password: string): Promise<Admin> {
      try {
        const adminDoc = await adminModel.findOne({ email, password });
  
        if (!adminDoc) {
          throw new AppError(HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_CREDENTIALS);
        }
  
        return JSON.parse(JSON.stringify(adminDoc))
  
      } catch (error: any) {
        throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
  
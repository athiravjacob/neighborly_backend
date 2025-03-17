// // presentation/controllers/adminController.ts
// import { NextFunction, Request, Response } from "express";
// import { adminLoginUseCase } from '../../application/usecases/admin/adminLogin';
// import { authServiceImpl } from "../../infrastructure/services/authService-impl";
// import { IUserRepository } from '../../domain/interface/repositories/userRepository';
// import { IauthService } from '../../domain/interface/services/authServices';
// import { setRefreshTokenCookie } from "../utils/cookieHelper";
// import { successResponse } from "../../shared/utils/responseHandler";
// import { MongoUserRepository } from "../../infrastructure/repositories/userRepo";
// import { GetAllUsersUseCase } from "../../application/usecases/admin/getAllUsers";

// // Ensure secrets are strings with fallbacks
// const JWT_SECRET = process.env.JWT_SECRET || 'default-access-secret'; 
// const REFRESH_SECRET = process.env.REFRESH_SECRET || 'default-refresh-secret'; 

// const userRepository: IUserRepository = new MongoUserRepository();
// const authService: IauthService = new authServiceImpl(JWT_SECRET, REFRESH_SECRET); 
// const adminLoginUC = new adminLoginUseCase(userRepository, authService);
// const getAllUsersUC = new GetAllUsersUseCase(userRepository); // Add this instance

// export const adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       const error = new Error('Email and password are required') as Error & { statusCode?: number };
//       error.statusCode = 400;
//       throw error;
//     }

//     const { accessToken, refreshToken, user } = await adminLoginUC.execute(email, password);
//     setRefreshTokenCookie(res, refreshToken);
//     successResponse(res, 200, 'Admin Login Success', { accessToken, user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const users = await getAllUsersUC.execute();
//       successResponse(res, 200, 'Users retrieved successfully', { users });
//     } catch (error) {
//       next(error);
//     }
//   };
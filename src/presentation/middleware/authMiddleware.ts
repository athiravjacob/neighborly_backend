import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../../shared/utils/responseHandler';
import { HttpStatus } from '../../shared/constants/httpStatus';
import { Messages } from '../../shared/constants/messages';
import { AppError } from '../../shared/utils/errors';
import { CheckUserBanStatusUsecase } from '../../application/usecases/user/checkUserBanStatus';

// Define the expected JWT payload structure
interface JwtPayload {
  id: string; // Adjust to number if your ID is numeric
  type: 'user' | 'neighbor' | 'admin';
  iat?: number;
  exp?: number;
}

// Extend Express Request to include custom properties
interface AuthRequest extends Request {
  userId?: string;
  userType?: 'user' | 'neighbor' | 'admin';
}

// Middleware to verify access token and authorize based on role
const verifyToken = (allowedTypes: Array<'user' | 'neighbor' | 'admin'> = [],
checkBanStatusUsecase: CheckUserBanStatusUsecase) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.cookies?.access_token;
      if (!accessToken) {
        console.log("access token expired")
        errorResponse(res, HttpStatus.UNAUTHORIZED, Messages.ERROR.ACCESS_TOKEN_EXPIRED);
        return;
      }

      // Verify the access token
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
      if (!decoded.id || !decoded.type) {
        console.log('Invalid token payload');
        errorResponse(res, HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_TOKEN);
        return;
      }

      // Check if the role (type) is allowed for this route
      if (allowedTypes.length > 0 && !allowedTypes.includes(decoded.type)) {
        console.log(`Allowed types: ${allowedTypes}, Decoded type: ${decoded.type}`);
        errorResponse(res, HttpStatus.FORBIDDEN, Messages.ERROR.FORBIDDEN);
        return;
      }

      // Check ban status for user or neighbor
      if (decoded.type === 'user' || decoded.type === 'neighbor') {
        await checkBanStatusUsecase.execute(decoded.id, decoded.type);
      }
      
      
      next();
    } catch (error) {
      console.log('Error in token verification:', error);
      if (error instanceof jwt.TokenExpiredError) {
        errorResponse(res, HttpStatus.UNAUTHORIZED, Messages.ERROR.ACCESS_TOKEN_EXPIRED);
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        errorResponse(res, HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_TOKEN);
        return;
      }
      if (error instanceof AppError) {
        errorResponse(res, error.statusCode, error.message);
        return;
      }
      errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, Messages.ERROR.AUTHENTICATION_ERROR);
      return;
    }
  };
};

export default verifyToken;
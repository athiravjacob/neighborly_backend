import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the expected JWT payload structure
interface JwtPayload {
  id: string; // Adjust to number if your ID is numeric
  type: 'user' | 'neighbor';
  iat?: number;
  exp?: number;
}

// Extend Express Request to include custom properties
interface AuthRequest extends Request {
  userId?: string;
  userType?: 'user' | 'neighbor';
}

// Middleware to verify access token and authorize based on role
const verifyToken = (allowedTypes: Array<'user' | 'neighbor'> = []) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.cookies?.access_token;
      if (!accessToken) {
        console.log("No access token")
        res.status(401).json({ error: 'Access token expired' });
        return;
      }

      // 2. Verify the access token using native Promise support
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
      if (!decoded.id || !decoded.type) {
        console.log("invalid s token")

        res.status(401).json({ error: 'Invalid token payload' });
        return;
      }

      // 3. Check if the role (type) is allowed for this route
      // if (allowedTypes.length > 0 && !allowedTypes.includes(decoded.type)) {
      //   console.log(allowedTypes,"allowed types")
      //   console.log(decoded.type,"decoded")
      //   res.status(403).json({ error: 'Access forbidden: insufficient role' });
      //   return;
      // }

      req.userId = decoded.id;
      req.userType = decoded.type;
      console.log("req.userId : " ,req.userId)
      next();
    } catch (error) {
      console.log(error,"error in token")
      if (error instanceof jwt.TokenExpiredError) {
        console.log(error,"Acces token exxpired")
        res.status(401).json({ error: 'Access token expired' });
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid access token' });
        return;
      }
      res.status(500).json({ error: 'Authentication error' });
      return;
    }
  };
};

export default verifyToken;
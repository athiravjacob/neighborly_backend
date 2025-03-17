import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define the expected shape of the JWT payload
interface JwtPayload {
  id: string;
  exp?: number |string; 
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Extract token from Authorization header
    
    const authHeader = req.headers["authorization"] 
    if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
    }

  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"
    if (!token) {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; 
    next(); // Proceed to the next handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
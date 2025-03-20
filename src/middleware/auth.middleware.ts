import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import checkEnvVariable from "../utils/checkEnv";

const seckretKey = checkEnvVariable("JWT_SECRET");
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, seckretKey) as {
      id: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

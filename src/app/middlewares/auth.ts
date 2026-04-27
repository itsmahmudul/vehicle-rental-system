import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const auth = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(decoded.role as string)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};

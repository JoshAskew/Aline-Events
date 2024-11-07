
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userName: string;
  id: number;
}



export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']; // Get token from the Authorization header

  if (!token) {
    res.sendStatus(401); // Unauthorized if token is not present
    return; // Ensure to exit the function here
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return; // Ensure to exit the function here
    }

    req.user = user as JwtPayload; // Attach the user payload to the request object
    next(); // Call the next middleware or route handler
  });
};

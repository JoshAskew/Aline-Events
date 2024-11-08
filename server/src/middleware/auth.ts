
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userName: string;
  id: number;
}



export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {


  console.log("req.headers");

  console.log(req.headers);

  let token = req.headers.authorization; // Get token from the Authorization header

  token = token?.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized if token is not present
    return; // Ensure to exit the function here
  }

  console.log("auth.ts middleware");
  console.log(process.env.JWT_SECRET_KEY);

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    console.log("err")
    console.log(err)
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return; // Ensure to exit the function here
    }

    req.user = user as JwtPayload; // Attach the user payload to the request object
    return next(); // Call the next middleware or route handler
  });
};

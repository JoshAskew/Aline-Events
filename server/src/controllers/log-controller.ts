import { Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { userName, password, zipCode } = req.body; // Get username and password from request body
  console.log('Login attempt:', req.body);

  try {
    const user = await User.findOne({ where: { userName } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    // Generate and return a JWT token
    const token = jwt.sign({ userName: user.userName }, SECRET_KEY as string, { expiresIn: '1h' });
    return res.json({ token }); // Return the token as JSON
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error' + error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    
    

    res.status(200).json({ message: 'User logged out' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

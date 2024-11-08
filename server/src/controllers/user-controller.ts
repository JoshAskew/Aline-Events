import { Request, Response } from 'express';
import jwt  from 'jsonwebtoken';
import {User} from '../models/user.js';

// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { userName, password, zipCode } = req.body;
  
  try {
    if (!userName || !zipCode || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log("signup process.env.JWT_SECRET_KEY")
    console.log(process.env.JWT_SECRET_KEY)

   //User.create calls model/user -> before create hook and User creates entry into database 
    const user = await User.create(req.body);
    const token = jwt.sign({ userName: user.userName, zipCode: user.zipCode }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User created successfully', token });
    
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName, password, zipCode } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.userName = userName;
      user.password = password;
      user.zipCode = zipCode;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

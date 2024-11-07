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

   //User.create calls model/user -> before create hook and User creates entry into database 
    const user = await User.create(req.body);
    const token = jwt.sign({ userName: user.userName, zipCode: user.zipCode }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User created successfully', token });
    
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// export const createUser = async (req: Request, res: Response) => {
//   const { userName, password, zipCode } = req.body;
//   try {
    
//     if (!userName || !zipCode || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const result = await pool.query(
//       `INSERT INTO users (userName, zipCode, password) 
//       VALUES ($1, $2, $3) 
//       RETURNING id`,
//       [userName, zipCode, hashedPassword]
//     );
    
//     return res.status(201).json({ message: 'User created successfully', userId: result.rows[0].id });
    
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

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

// import pkg from 'pg';

// const { Pool } = pkg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || '5432', 10),
// });
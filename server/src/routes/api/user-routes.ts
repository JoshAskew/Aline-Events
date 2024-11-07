import express from 'express';
import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';

import { User } from '../../models/user.js'; // getting imported from models/index

export const createUsers = async (_req: Request, res: Response) => {
  try {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once


  User.bulkCreate([
    {
      userName: 'JollyGuru',
      password: 'password',
      zipCode: '55415'
    },
    {
      userName: 'SunnyScribe',
      password: 'password',
      zipCode: '55436',
    },
    {
      userName: 'RadiantComet',
      password: 'password',
      zipCode: '55024',
    },

  ])
    res.status(200).json({ message: 'Book data seeded.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/signup', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

router.post('/seed', createUsers);

export { router as userRouter };

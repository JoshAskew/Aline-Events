import { Request, Response } from 'express';
import { Event } from '../models/events.js';
import { User } from '../models/user.js';

// Get/Events/:id
// get all saved events for a user based on their id in the database
export const getEventsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const events = await Event.findAll({ where: { userId: id } });
      res.json(events);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from 'express';
import { User } from '../models/user';
import { Event } from '../models/events';
//import { UserEvent } from '../models/userEvent.ts';


//Save event to users profile
export const saveEvent = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.body;
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);
    if (!user || !event) {
      res.status(404).json({ error: 'User or event not found' });
      return;
    }
    //await UserEvent.create({ userId, eventId });
    res.status(201).json({ message: 'Event saved to user profile' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while saving event:', err });
  }
}

//Get all events saved to user profile
export const getSavedEvents = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const events = await Event.findAll({ where: { userId } });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// // delete an event from the events table
// export const deleteEvent = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const event = await Event.findByPk(id);
//     if (event) {
//       await event.destroy();
//       res.json({ message: 'Event deleted' });
//     } else {
//       res.status(404).json({ message: 'Error deleting event' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   };
// };

// //Delete event from user profile
export const deleteEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user || !event) {
      res.status(404).json({ message: 'User or event not found' });
      return;
    }

    //await UserEvent.destroy({ where: { userId, eventId } });
    res.json({ message: 'Event deleted from user profile' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
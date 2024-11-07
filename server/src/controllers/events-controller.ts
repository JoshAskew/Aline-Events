import { Request, Response } from 'express';
import { User } from '../models/user';
import { Event } from '../models/events';
//import { UserEvent } from '../models/userEvent.ts';


//save event into the events table and connect it to the specific user saving it via the userID foriegnKey
export const saveEvent = async (req: Request, res: Response) => {
  const { userId, name, url, type, images, dates, priceRanges, info, venue } = req.body;
  try {
    const saveEvent = await Event.create({  userId, name, url, type, images, dates, priceRanges, info, venue });
    res.status(201).json(saveEvent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  };
};

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


// delete an event from the events table
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event) {
      await event.destroy();
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'Error deleting event' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  };
};

// //Delete event from user profile
// export const deleteEvent = async (req: Request, res: Response) => {
//   const { userId, eventId } = req.body;

//   try {
//     const user = await User.findByPk(userId);
//     const event = await Event.findByPk(eventId);

//     if (!user || !event) {
//       res.status(404).json({ message: 'User or event not found' });
//       return;
//     }

//     await UserEvent.destroy({ where: { userId, eventId } });
//     res.json({ message: 'Event deleted from user profile' });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }
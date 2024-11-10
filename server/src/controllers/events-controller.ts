import { Request, Response } from 'express';
import { User } from '../models/user';
import { Event } from '../models/events';
import jwt, { JwtPayload } from 'jsonwebtoken';
//import { UserEvent } from '../models/userEvent.ts';


//save event into the events table and connect it to the specific user saving it via the userID foriegnKey
export const saveEvent = async (req: Request, res: Response) => {
  const { name, url, imageUrl, venue, date } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & { id: number };
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const saveEvent = await Event.create({ userId, name, url, imageUrl, venue, date });
    res.status(201).json(saveEvent);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Get all events saved to user profile
export const getSavedEvents = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & { id: number };
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedEvents = await Event.findAll({ where: { userId } });
    res.status(200).json(savedEvents);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// delete an event from the events table
export const deleteEvent = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload & { id: number };
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const eventId = req.params.id;
    const event = await Event.findOne({ where: { id: eventId, userId } });

    await event?.destroy();

    return res.status(200).json({ message: 'Event deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

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
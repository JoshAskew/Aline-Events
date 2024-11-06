import { Request, Response } from 'express';
import { User } from '../models/user';
import { Event } from '../models/events';
import { UserEvent } from '../models/userEvent';
import { searchTicketMaster } from '../api/TicketMasterAPI';

//Get events based on API call from ticketmaster using user zipcode
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await searchTicketMaster();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching events:', err });
  }
};

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
    await UserEvent.create({ userId, eventId });
    res.status(201).json({ message: 'Event saved to user profile' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while saving event:', err });
  }
}

//Get all events saved to user profile
export const getSavedEvents = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Event,
          through: { attributes: [] },
        },
      ],
    });

    if (user) {
      res.json(user.get('Events'));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Delete event from user profile
export const deleteEvent = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(eventId);

    if (!user || !event) {
      res.status(404).json({ message: 'User or event not found' });
      return;
    }

    await UserEvent.destroy({ where: { userId, eventId } });
    res.json({ message: 'Event deleted from user profile' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
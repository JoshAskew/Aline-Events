import express from 'express';
import {
  getEvents,
  saveEvent,
  getSavedEvents,
  deleteEvent,
} from '../../controllers/events-controller';

const router = express.Router();

router.get('/', getEvents);

router.post('/save', saveEvent);

router.get('/saved/:userId', getSavedEvents);

router.delete('/delete', deleteEvent);

export { router as eventRouter };
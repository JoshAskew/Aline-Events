import express from 'express';
import {
  saveEvent,
  getSavedEvents,
  deleteEvent,
} from '../../controllers/events-controller';

const router = express.Router();

router.post('/save', saveEvent);
router.get('/saved/:userId', getSavedEvents);
router.delete('/delete', deleteEvent);

export default router;

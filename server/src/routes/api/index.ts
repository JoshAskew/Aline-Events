import { Router } from 'express';
import userRouter  from './user-routes.js';
import eventsRouter  from './events-routes.js';
import getTicketData from '../../api/ticketData.js';
import getWeatherData from '../../api/WeatherAPI.js';

const router = Router();


router.post('/ticketData', getTicketData);
router.get('/weatherData', getWeatherData);

router.use('/users', userRouter);
router.use('/events', eventsRouter);

export default router;

import { Router } from 'express';
import userRouter  from './user-routes.js';
import eventsRouter  from './events-routes.js';
import getTicketData from '../../api/ticketData.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

//authenticateToken not working 
router.get('/ticketData', 
    // authenticateToken,
     getTicketData);
router.use('/users', userRouter);
router.use('/events', eventsRouter);

export default router;

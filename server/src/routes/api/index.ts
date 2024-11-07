import { Router } from 'express';
import { userRouter } from './user-routes.js';
import getTicketData from '../../api/geoData.js';

const router = Router();

router.get('/ticketData', getTicketData);
router.use('/users', userRouter);

export default router;

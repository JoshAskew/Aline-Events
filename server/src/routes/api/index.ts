import { Router } from 'express';
import { userRouter } from './user-routes.js';
import getTicketData from '../../api/ticketData.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.get('/ticketData', authenticateToken, getTicketData);
router.use('/users', userRouter);

export default router;

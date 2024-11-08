import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiIndexRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);

//authenticateToken not working correctly 
//router.use('/api',authenticateToken, apiIndexRoutes);
router.use('/api', apiIndexRoutes);
export default router;

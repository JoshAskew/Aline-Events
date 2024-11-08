import { Router } from 'express';
import { login, logout } from '../controllers/log-controller';
import { createUser } from '../controllers/user-controller.js';

const router = Router();

// POST /login - Login a user
router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', createUser);

export default router;

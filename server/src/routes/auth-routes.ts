import { Router } from 'express';
import { login } from '../controllers/login-controller';
import { createUser } from '../controllers/user-controller.js';


const router = Router();

// POST /login - Login a user
router.post('/login', login);
//router.get('/logout', logoutController);


export default router;

import { Router } from 'express';
import { changePassword } from '@controllers/authController';
import { authenticate } from '@middleware/authMiddleware';

const router = Router();

router.post('/change-password', authenticate, changePassword);

export default router;

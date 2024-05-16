import { Router } from 'express';
import {
  registerMember,
  getMemberProfile,
  editMemberProfile,
  deleteMember,
} from '@controllers/memberController';
import { authenticate } from '@middleware/authMiddleware';
import { validateRegistration, validateProfileEdit } from '@middleware/validationMiddleware';

const router = Router();

router.post('/register', validateRegistration, registerMember);
router.get('/profile', authenticate, getMemberProfile);
router.put('/edit-profile', authenticate, validateProfileEdit, editMemberProfile);
router.delete('/delete-account', authenticate, deleteMember);

export default router;

import { Request, Response } from 'express';
import members from '../models/memberModel';

export const changePassword = (req: Request, res: Response): void => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user!.id;
  const member = members.find(m => m.id === userId);

  if (!member || member.password !== currentPassword) {
    res.status(400).json({ message: 'Current password is incorrect' });
    return;
  }

  if (newPassword !== confirmPassword) {
    res.status(400).json({ message: 'New password and confirmation do not match' });
    return;
  }

  member.password = newPassword;
  res.status(200).json({ message: 'Password changed successfully' });
};

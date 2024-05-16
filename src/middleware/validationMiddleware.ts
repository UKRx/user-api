import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password, name, dateOfBirth, gender, address, subscribeToNewsletter } = req.body;
    if (!email || !password || !name || !dateOfBirth || !gender || !address) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    next();
};

export const validateProfileEdit = (req: Request, res: Response, next: NextFunction): void => {
    const { dateOfBirth, gender, address, subscribeToNewsletter } = req.body;
    if (!dateOfBirth && !gender && !address && subscribeToNewsletter === undefined) {
        res.status(400).json({ message: 'At least one field must be updated' });
        return;
    }
    next();
};


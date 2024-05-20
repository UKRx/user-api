import { Request, Response } from 'express';
import members from '../models/memberModel';

export const registerMember = (req: Request, res: Response): void => {
    const { email, password, name, dateOfBirth, gender, address, subscribeToNewsletter } = req.body;
    const newMember = {
        id: members.length + 1,
        email,
        password,
        name,
        dateOfBirth,
        gender,
        address,
        subscribeToNewsletter,
    };
    members.push(newMember);
    res.status(201).json({ message: 'Member registered successfully', member: newMember });
};

export const getMemberProfile = (req: Request, res: Response): void => {
    const userId = req.user!.id;
    const member = members.find(m => m.id === userId);
    if (!member) {
        res.status(404).json({ message: 'Member not found' });
        return;
    }
    const { email, name, dateOfBirth, gender, address, subscribeToNewsletter } = member;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    res.status(200).json({ email, name, age, gender, address, subscribeToNewsletter });
};

export const editMemberProfile = (req: Request, res: Response): void => {
    const userId = req.user!.id;
    const { dateOfBirth, gender, address, subscribeToNewsletter } = req.body;
    const member = members.find(m => m.id === userId);
    if (!member) {
        res.status(404).json({ message: 'Member not found' });
        return;
    }
    member.dateOfBirth = dateOfBirth || member.dateOfBirth;
    member.gender = gender || member.gender;
    member.address = address || member.address;
    member.subscribeToNewsletter = subscribeToNewsletter !== undefined ? subscribeToNewsletter : member.subscribeToNewsletter;
    res.status(200).json({ message: 'Profile updated successfully', member });
};

export const deleteMember = (req: Request, res: Response): void => {
    const userId = req.user!.id;
    const memberIndex = members.findIndex(m => m.id === userId);
    if (memberIndex === -1) {
        res.status(404).json({ message: 'Member not found' });
        return;
    }
    members.splice(memberIndex, 1);
    res.status(200).json({ message: 'Member deleted successfully' });
};

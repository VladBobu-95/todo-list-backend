import { Request, Response, NextFunction } from 'express';
import { registerUser, login, getCurrentUser, changePassword } from '../services/auth.service';
import { changePasswordSchema, loginSchema, registerSchema, validate } from '../utils/validation';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = validate(registerSchema, req.body);
        const user = await registerUser(name, email, password);
        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        next(err);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = validate(loginSchema, req.body);
        const token = await login(email, password);
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getCurrentUser(req.user!.sub);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { currentPassword, newPassword } = validate(changePasswordSchema, req.body);
        await changePassword(req.user!.sub, currentPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        next(err);
    }
};

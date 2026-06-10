import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import { ValidationError, UnauthorizedError, NotFoundError } from "../utils/errors";
import jwt from 'jsonwebtoken';
import { env } from "../config/env";

const userRepo = () => AppDataSource.getRepository(User);

const getUserByEmail = async (email: string) => {
    return await userRepo().findOneBy({ email });
}

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const registerUser = async (name: string, email: string, password: string) => {
    if (await getUserByEmail(email)) {
        throw new ValidationError("Email already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = userRepo().create({
        name,
        email,
        password: hashedPassword
    });
    const saved = await userRepo().save(user);
    const { password: _, ...safeUser } = saved;
    return safeUser;
}

export const login = async (email: string, password: string) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
        { sub: user.id, email: user.email },
        env.jwt.secret,
        { expiresIn: env.jwt.expiresIn as any }
    );

    return token;
}

export const getCurrentUser = async (id: number) => {
    return await userRepo().findOne({
        where: { id },
        select: { id: true, name: true, email: true, createdAt: true }
    });
}

export const changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
    const user = await userRepo().findOneBy({ id: userId });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) {
        throw new UnauthorizedError("Incorrect current password");
    }
    user.password = await hashPassword(newPassword);
    return await userRepo().save(user);
}

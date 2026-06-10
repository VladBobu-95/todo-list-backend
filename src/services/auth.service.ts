import { AppDataSource } from "../config/data-source";
import { Usuario } from "../entities/Usuario";
import bcrypt from 'bcrypt';
import { ValidationError, UnauthorizedError, NotFoundError } from "../utils/errors";
import jwt from 'jsonwebtoken';
import { env } from "../config/env";

const userRepo = () => AppDataSource.getRepository(Usuario);

const getUsuarioByEmail = async (email: string) => {
    return await userRepo().findOneBy({ email });
}

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const registrarUsuario = async (nombre: string, email: string, password: string) => {
    if (await getUsuarioByEmail(email)) {
        throw new ValidationError("Email ya existe");
    }

    const hashedPassword = await hashPassword(password);
    const usuario = userRepo().create({
        nombre,
        email,
        password: hashedPassword
    });
    return await userRepo().save(usuario);
}

export const login = async (email: string, password: string) => {
    const usuario = await getUsuarioByEmail(email);

    if (!usuario) {
        throw new UnauthorizedError("Credenciales incorrectas");
    }

    const passwordValid = await bcrypt.compare(password, usuario.password);
    if (!passwordValid) {
        throw new UnauthorizedError("Credenciales incorrectas");
    }

    const token = jwt.sign(
        { sub: usuario.id, email: usuario.email },
        env.jwt.secret,
        { expiresIn: env.jwt.expiresIn as any }
    );

    return token;
}

export const obtenerUsuarioActual = async (id: number) => {    
return await userRepo().findOne({
    where: { id },
    select: { id: true, nombre: true, email: true, createdAt: true }
});
}

export const cambiarPassword = async (usuarioId: number, passwordActual: string, passwordNuevo: string) => {
    const usuario = await userRepo().findOneBy({ id: usuarioId });
    if (!usuario) {
        throw new NotFoundError("Usuario no encontrado");
    }
    const passwordValid = await bcrypt.compare(passwordActual, usuario.password);
    if (!passwordValid) {
        throw new UnauthorizedError("Contraseña actual incorrecta");
    }
    usuario.password = await hashPassword(passwordNuevo);
    return await userRepo().save(usuario);
}


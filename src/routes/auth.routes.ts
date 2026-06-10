
import { Router } from "express";
import { registrarUsuario, login, obtenerUsuarioActual, cambiarPassword } from "../services/auth.service";
import { cambiarPasswordSchema, loginSchema, registerSchema, validar } from "../utils/validation";
import { authenticateJWT } from "../middleware/auth.middleware";


export const authRouter = Router();



authRouter.post("/register", async (req, res, next) => {
    try {
        const { nombre, email, password } = validar(registerSchema, req.body);
        const usuario = await registrarUsuario(nombre, email, password);
        res.status(201).json({ id: usuario.id, email: usuario.email });
    } catch (err) {
        next(err);
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = validar(loginSchema, req.body);
        const token = await login(email, password);
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

authRouter.get("/me",authenticateJWT, async (req, res, next) => {
    try {
        const usuario = await obtenerUsuarioActual(req.user!.sub);
        res.json(usuario);
    } catch (err) {
        next(err);
    }
});

authRouter.post("/change-password", authenticateJWT, async (req, res, next) => {
    try {
        const { passwordActual, passwordNuevo } = validar(cambiarPasswordSchema, req.body);
        await cambiarPassword(req.user!.sub, passwordActual, passwordNuevo);
        res.status(200).json({ message: "Contraseña cambiada exitosamente" });
    } catch (err) {
        next(err);
    }
});

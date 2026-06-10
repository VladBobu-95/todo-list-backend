import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { crearTarea, obtenerTareasPorUsuario, actualizarTarea, eliminarTarea, obtenerTareaPorIdYCreador, obtenerHistorialDeTarea } from "../services/tareas.service";
import { actualizarTareaSchema, crearTareaSchema, validar } from "../utils/validation";

export const tareasRouter = Router();

tareasRouter.use(authenticateJWT);

tareasRouter.post("/", async (req, res, next) => {
    try {
        const { titulo, descripcion } = validar(crearTareaSchema, req.body);
        const usuarioId = req.user!.sub;
        const tarea = await crearTarea(usuarioId, titulo, descripcion);
        res.status(201).json(tarea);
    } catch (err) {
        next(err);
    }
});

tareasRouter.get("/", async (req, res, next) => {
    try {
    const usuarioId = req.user!.sub;
    const completada = req.query.completada === 'true' ? true 
    : req.query.completada === 'false' ? false 
    : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const tareas = await obtenerTareasPorUsuario(usuarioId, completada, page, limit);
        res.json(tareas);
    } catch (err) {
        next(err);
    }
});

tareasRouter.patch("/:id", async (req, res, next) => {
    try {
        const tareaId = Number(req.params.id);
        const usuarioId = req.user!.sub;
        const { titulo, descripcion, completada } = validar(actualizarTareaSchema, req.body);
        const tarea = await actualizarTarea(tareaId, usuarioId, titulo, descripcion, completada);
        res.json(tarea);
    } catch (err) {
        next(err);
    }
});

tareasRouter.delete("/:id", async (req, res, next) => {
    try {
        const tareaId = Number(req.params.id);
        const usuarioId = req.user!.sub;
        await eliminarTarea(tareaId, usuarioId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

tareasRouter.get("/:id", async (req, res, next) => {
    try {
        const tareaId = Number(req.params.id);
        const usuarioId = req.user!.sub;
        const tarea = await obtenerTareaPorIdYCreador(tareaId, usuarioId);
        res.json(tarea);
    } catch (err) {
        next(err);
    }
});

tareasRouter.get("/:id/historial", async (req, res, next) => {
    try {
        const tareaId = Number(req.params.id);
        const usuarioId = req.user!.sub;
        const historial = await obtenerHistorialDeTarea(tareaId, usuarioId);
        res.json(historial);
    } catch (err) {
        next(err);
    }
});

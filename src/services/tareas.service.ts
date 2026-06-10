import { AppDataSource } from "../config/data-source";
import { Tarea } from "../entities/Tarea";
import { NotFoundError } from "../utils/errors";
import {Historial} from "../entities/Historial";




const tareasRepo = () => AppDataSource.getRepository(Tarea);
const historialRepo = () => AppDataSource.getRepository(Historial);

export const crearTarea = async (usuarioId: number, titulo: string, descripcion?: string) => {
    const tarea = tareasRepo().create({
        usuarioId,
        titulo,
        completada: false,
        descripcion
    });
    return await tareasRepo().save(tarea);
}

export const obtenerTareasPorUsuario = async (usuarioId: number, completada?: boolean, page?: number, limit?: number) => {
    const where: any = { usuarioId };
    if (completada !== undefined) {
        where.completada = completada;
    }
   return await tareasRepo().find({
        where,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit
    });
}

export const actualizarTarea = async (tareaId: number, usuarioId: number, titulo?: string, descripcion?: string, completada?: boolean) => {
    const tarea = await tareasRepo().findOneBy({ id: tareaId, usuarioId });

    if (!tarea) {
        throw new NotFoundError("Tarea no encontrada");
    }
    const historialEntry = historialRepo().create({
        tareaId,
        usuarioId,
        accion: "MODIFICADO",
        valorAnterior: JSON.stringify({ titulo: tarea.titulo, descripcion: tarea.descripcion, completada: tarea.completada }),
        valorNuevo: JSON.stringify({ titulo, descripcion, completada }),
    });

    await historialRepo().save(historialEntry);

    Object.assign(tarea, { 
        ...(titulo !== undefined && { titulo }),
        ...(descripcion !== undefined && { descripcion }),
        ...(completada !== undefined && { completada })
     });
    return await tareasRepo().save(tarea);
}

export const eliminarTarea = async (tareaId: number, usuarioId: number) => {
    const tarea = await tareasRepo().findOneBy({ id: tareaId, usuarioId });
    if (!tarea) {
        throw new NotFoundError("Tarea no encontrada");
    }

    const historialEntry = historialRepo().create({
        tareaId,
        usuarioId,
        accion: "ELIMINADO",
        valorAnterior: JSON.stringify({ titulo: tarea.titulo, descripcion: tarea.descripcion, completada: tarea.completada }),
    });
    await historialRepo().save(historialEntry);
    return await tareasRepo().remove(tarea);
}

export const marcarTareaComoCompletada = async (tareaId: number, usuarioId: number) => {
    const tarea = await tareasRepo().findOneBy({ id: tareaId, usuarioId });
    if (!tarea) {
        throw new NotFoundError("Tarea no encontrada");
    }
    const historialEntry = historialRepo().create({
        tareaId,
        usuarioId,
        accion: "COMPLETADO",
        valorAnterior: JSON.stringify({ titulo: tarea.titulo, descripcion: tarea.descripcion, completada: tarea.completada }),
        valorNuevo: JSON.stringify({ titulo: tarea.titulo, descripcion: tarea.descripcion, completada: true }),
    });
    await historialRepo().save(historialEntry);
    tarea.completada = true;
    return await tareasRepo().save(tarea);
}

export const obtenerTareaPorIdYCreador = async (tareaId: number, usuarioId: number) => {
    const tarea = await tareasRepo().findOneBy({ id: tareaId, usuarioId });
    if (!tarea) {
        throw new NotFoundError("Tarea no encontrada");
    }
    return tarea;
}

export const obtenerHistorialDeTarea = async (tareaId: number, usuarioId: number) => {
    const tarea = await tareasRepo().findOneBy({ id: tareaId, usuarioId });
    if (!tarea) {
        throw new NotFoundError("Tarea no encontrada");
    }
    return await historialRepo().findBy({ tareaId });
}

//si la empresa puede utilizar qr
//crear empresa
//superadmin &akx emial
// ver 

import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { Tarea } from './entities/Tarea';

async function seed() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Tarea);

    for (let i = 1; i <= 20; i++) {
        await repo.save(repo.create({
            usuarioId: 1,
            titulo: `Tarea ${i}`,
            descripcion: `Descripción de la tarea ${i}`,
            completada: i % 2 === 0
        }));
    }

    console.log('20 tareas creadas');
    process.exit(0);
}

seed();
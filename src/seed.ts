import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { Task } from './entities/Task';
import { logger } from './utils/logger';

async function seed() {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Task);

    for (let i = 1; i <= 20; i++) {
        await repo.save(repo.create({
            userId: 1,
            title: `Task ${i}`,
            description: `Description of task ${i}`,
            completed: i % 2 === 0
        }));
    }

    logger.info('20 tasks created');
    process.exit(0);
}

seed();

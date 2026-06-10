import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

async function main() {
    try {
        await AppDataSource.initialize();
        logger.info('Database connection established successfully.');
        app.listen(env.port, () => {
            logger.info({ port: env.port }, 'Server is running');
        });
    } catch (error) {
        logger.error({ err: error }, 'Error during Data Source initialization');
        process.exit(1);
    }
}

main();

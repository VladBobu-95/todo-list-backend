import 'reflect-metadata';
import {AppDataSource} from './config/data-source';
import app from './app';
import { env } from './config/env';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully.');
        app.listen(env.port, () => {
            console.log(`Server is running on port ${env.port}`);
        });
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        process.exit(1);
    }
}

main();
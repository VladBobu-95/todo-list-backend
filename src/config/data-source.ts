
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {env} from './env';
import { User } from '../entities/User';
import { Task } from '../entities/Task';
import { TaskHistory } from '../entities/TaskHistory';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.db.host,
    port: env.db.port,
    username: env.db.user,
    password: env.db.password,
    database: env.db.name,
    entities: [TaskHistory, Task, User],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: env.nodeEnv === 'development'
});

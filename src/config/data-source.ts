
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {env} from './env';
import { Usuario } from '../entities/Usuario';
import { Tarea } from '../entities/Tarea';
import { Historial } from '../entities/Historial';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.db.host,
    port: env.db.port,
    username: env.db.user,
    password: env.db.password,
    database: env.db.name,
    entities: [Historial, Tarea, Usuario],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: env.nodeEnv === 'development'
});
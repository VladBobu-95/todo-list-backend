
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { logger } from './utils/logger';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import { tasksRouter } from './routes/tasks.routes';


const app = express();
app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cors({ origin: env.corsOrigin }));
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route Not Found' });
});

app.use(errorHandler);

export default app;

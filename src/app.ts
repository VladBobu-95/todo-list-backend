
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import {tareasRouter} from './routes/tareas.routes';


const app = express();
app.use(express.json());
app.use(cors(
    {origin: env.corsOrigin}
));  
app.use('/api/auth', authRouter);
app.use('/api/tareas', tareasRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route Not Found' });
});

app.use(errorHandler);  

export default app;
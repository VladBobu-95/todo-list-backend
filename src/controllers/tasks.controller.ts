import { Request, Response, NextFunction } from 'express';
import { createTask, getTasksByUser, updateTask, deleteTask, getTaskByIdAndOwner, getTaskHistory } from '../services/tasks.service';
import { createTaskSchema, updateTaskSchema, validate } from '../utils/validation';

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = validate(createTaskSchema, req.body);
        const userId = req.user!.sub;
        const task = await createTask(userId, title, description);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

export const getTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.sub;
        const completed = req.query.completed === 'true' ? true
            : req.query.completed === 'false' ? false
            : undefined;
        const page = req.query.page ? Number(req.query.page) : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const tasks = await getTasksByUser(userId, completed, page, limit);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const updateTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.id);
        const userId = req.user!.sub;
        const { title, description, completed } = validate(updateTaskSchema, req.body);
        const task = await updateTask(taskId, userId, title, description, completed);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.id);
        const userId = req.user!.sub;
        await deleteTask(taskId, userId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

export const getTaskByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.id);
        const userId = req.user!.sub;
        const task = await getTaskByIdAndOwner(taskId, userId);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const getTaskHistoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = Number(req.params.id);
        const userId = req.user!.sub;
        const history = await getTaskHistory(taskId, userId);
        res.json(history);
    } catch (err) {
        next(err);
    }
};
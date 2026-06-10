import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from "../config/data-source";
import { Task } from "../entities/Task";
import { NotFoundError } from "../utils/errors";
import { TaskHistory } from "../entities/TaskHistory";

const taskRepo = () => AppDataSource.getRepository(Task);
const taskHistoryRepo = () => AppDataSource.getRepository(TaskHistory);

export const createTask = async (userId: number, title: string, description?: string) => {
    const task = taskRepo().create({
        userId,
        title,
        completed: false,
        description
    });
    return await taskRepo().save(task);
}

export const getTasksByUser = async (userId: number, completed?: boolean, page?: number, limit?: number) => {
    const where: FindOptionsWhere<Task> = { userId };
    if (completed !== undefined) {
        where.completed = completed;
    }
    return await taskRepo().find({
        where,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit
    });
}

export const updateTask = async (taskId: number, userId: number, title?: string, description?: string, completed?: boolean) => {
    const task = await taskRepo().findOneBy({ id: taskId, userId });

    if (!task) {
        throw new NotFoundError("Task not found");
    }
    const historyEntry = taskHistoryRepo().create({
        taskId,
        userId,
        action: "MODIFIED",
        previousValue: JSON.stringify({ title: task.title, description: task.description, completed: task.completed }),
        newValue: JSON.stringify({ title, description, completed }),
    });

    await taskHistoryRepo().save(historyEntry);

    Object.assign(task, {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed })
    });
    return await taskRepo().save(task);
}

export const deleteTask = async (taskId: number, userId: number) => {
    const task = await taskRepo().findOneBy({ id: taskId, userId });
    if (!task) {
        throw new NotFoundError("Task not found");
    }

    const historyEntry = taskHistoryRepo().create({
        taskId,
        userId,
        action: "DELETED",
        previousValue: JSON.stringify({ title: task.title, description: task.description, completed: task.completed }),
    });
    await taskHistoryRepo().save(historyEntry);
    return await taskRepo().remove(task);
}

export const getTaskByIdAndOwner = async (taskId: number, userId: number) => {
    const task = await taskRepo().findOneBy({ id: taskId, userId });
    if (!task) {
        throw new NotFoundError("Task not found");
    }
    return task;
}

export const getTaskHistory = async (taskId: number, userId: number) => {
    const task = await taskRepo().findOneBy({ id: taskId, userId });
    if (!task) {
        throw new NotFoundError("Task not found");
    }
    return await taskHistoryRepo().findBy({ taskId });
}

import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createTaskController, getTasksController, updateTaskController, deleteTaskController, getTaskByIdController, getTaskHistoryController } from "../controllers/tasks.controller";

export const tasksRouter = Router();

tasksRouter.use(authenticateJWT);

tasksRouter.post("/", createTaskController);
tasksRouter.get("/", getTasksController);
tasksRouter.patch("/:id", updateTaskController);
tasksRouter.delete("/:id", deleteTaskController);
tasksRouter.get("/:id", getTaskByIdController);
tasksRouter.get("/:id/history", getTaskHistoryController);
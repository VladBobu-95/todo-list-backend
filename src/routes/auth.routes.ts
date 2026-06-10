import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticateJWT } from "../middleware/auth.middleware";
import { registerController, loginController, getMeController, changePasswordController } from "../controllers/auth.controller";

export const authRouter = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Too many login attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});

authRouter.post("/register", registerController);
authRouter.post("/login", loginLimiter, loginController);
authRouter.get("/me", authenticateJWT, getMeController);
authRouter.post("/change-password", authenticateJWT, changePasswordController);

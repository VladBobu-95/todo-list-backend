

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Datos de entrada no válidos") {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Recurso no encontrado") {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "No autorizado") {
        super(message, 401);
    }
}


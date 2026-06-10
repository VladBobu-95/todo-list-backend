# To-Do List Backend

API REST para gestión de tareas con autenticación JWT.

## Tecnologías
- Node.js + TypeScript
- Express
- TypeORM + MySQL
- JWT, Bcrypt, Zod

## Instalación
1. Clonar el repo
2. `npm install`
3. Copiar `.env.example` y rellenar con tus credenciales
4. `docker compose up -d`
5. `npm run migration:run`
6. `npm run dev`

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tareas`
- `POST /api/tareas`
- `PATCH /api/tareas/:id`
- `DELETE /api/tareas/:id`
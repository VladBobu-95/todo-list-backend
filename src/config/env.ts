import 'dotenv/config';

const required = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'PORT',
    'NODE_ENV',
    'JWT_SECRET',
    'JWT_EXPIRES_IN'
]as const;


for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export enum NodeEnv {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export const env = {
    db: {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        name: process.env.DB_NAME!
    },
    port: parseInt(process.env.PORT!),
    nodeEnv: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.Development,
    jwt: {
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_EXPIRES_IN!
    },
    corsOrigin: process.env.CORS_ORIGIN ?? '*'
};

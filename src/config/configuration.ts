import databaseConfig from './database.config';

export default () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT) || 3000,
    database: databaseConfig(),
    corsOrigins: process.env.CORS_ORIGINS ?? '*',
});

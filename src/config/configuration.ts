export default () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT) || 3000,
    database: {
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER ?? 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'postgres',
        database: process.env.DATABASE_NAME ?? 'development',
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '60m',
    },
});

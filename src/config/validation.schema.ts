import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_HOST: Joi.string().default('localhost'),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().default('postgres'),
    DATABASE_PASSWORD: Joi.string().default('postgres'),
    DATABASE_NAME: Joi.string().default('development'),
    CORS_ORIGINS: Joi.alternatives()
        .try(
            Joi.string().valid('*'),
            Joi.array().items(Joi.string().uri()),
            Joi.string().uri(),
        )
        .default('*'),
});

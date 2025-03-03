import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
    TransformInterceptor,
    LoggingInterceptor,
    TimeoutInterceptor,
} from './common/interceptors/global';
import {
    AllExceptionsFilter,
    HttpExceptionFilter,
} from './common/filters/global';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const httpAdapter = app.get(HttpAdapterHost);

    // CORS Configuration
    app.enableCors({
        origin: configService.get('CORS_ORIGINS', '*'),
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization',
            'X-CSRF-Token',
        ],
        exposedHeaders: ['X-Response-Time'],
        maxAge: 3600,
    });

    // Global Filters
    app.useGlobalFilters(
        new AllExceptionsFilter(httpAdapter),
        new HttpExceptionFilter(),
    );

    // Global Interceptors
    app.useGlobalInterceptors(
        new TransformInterceptor(),
        new LoggingInterceptor(),
        new TimeoutInterceptor(),
    );

    // Global Validation Pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Strip properties that don't have decorators
            forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
            transform: true, // Transform payloads to be objects typed according to their DTO classes
        }),
    );

    await app.listen(configService.get('port', 3000));
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

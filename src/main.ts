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

    const port = configService.get<number>('port', 3000);
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

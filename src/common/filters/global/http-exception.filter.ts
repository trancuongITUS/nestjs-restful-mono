import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: exception.message || null,
            error: exception.name,
        };

        this.logger.error(
            `${request.method} ${request.url} ${status} - ${exception.message}`,
        );

        response.status(status).json(errorResponse);
    }
}

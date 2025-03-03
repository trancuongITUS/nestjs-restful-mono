import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: request.url,
            message:
                exception instanceof HttpException
                    ? exception.message
                    : 'Internal server error',
        };

        this.logger.error(
            `${request.method} ${request.url} ${httpStatus}`,
            exception instanceof Error ? exception.stack : '',
        );

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const startTime = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const responseTime = Date.now() - startTime;

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength}B - ${responseTime}ms - ${ip} ${userAgent}`,
            );
        });

        next();
    }
}

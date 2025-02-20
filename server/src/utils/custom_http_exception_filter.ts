import {ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException} from '@nestjs/common';
import {Response} from 'express';

@Catch(HttpException, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException ? exception.getStatus() : 404;
        const exceptionResponse = exception.getResponse();

        response
            .status(typeof exceptionResponse === 'string' ? status : exceptionResponse['status'] || status)
            .json({
                ...(typeof exceptionResponse === 'string' ? {
                    status: status,
                    message: exceptionResponse
                } : {
                    'message': exceptionResponse['message'] || 'Not Found',
                    'status': exceptionResponse['status'] || status,
                }),
            });
    }
}
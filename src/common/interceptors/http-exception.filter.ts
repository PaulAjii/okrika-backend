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
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    const message =
      typeof exceptionMessage === 'object' && 'message' in exceptionMessage
        ? (exceptionMessage as any).message
        : exceptionMessage;

    const responseBody = {
      statusCode: httpStatus,
      success: false,
      error:
        exception instanceof HttpException
          ? exception.name
          : 'InternalServerError',
      path: httpAdapter.getRequestUrl(ctx.getRequest()) as string,
      message: Array.isArray(message) ? message[0] : message,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(JSON.stringify(responseBody));

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

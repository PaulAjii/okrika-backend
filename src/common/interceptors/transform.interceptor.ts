import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const status_code = response.statusCode;

        const message = data?.message;
        let cleanData = data && data.data && data.message ? data.data : data;

        if (cleanData && Array.isArray(cleanData)) {
          cleanData = cleanData.map((item) =>
            plainToClass(item.constructor, item, {
              excludeExtraneousValues: false,
            }),
          );
        } else if (
          cleanData &&
          typeof cleanData === 'object' &&
          cleanData.constructor.name !== 'Object'
        ) {
          cleanData = plainToClass(cleanData.constructor, cleanData, {
            excludeExtraneousValues: false,
          });
        }

        return {
          statusCode: status_code,
          success: true,
          message: message,
          data: cleanData,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

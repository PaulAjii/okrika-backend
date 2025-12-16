import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status_code: number;
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
        const cleanData = data && data.data && data.message ? data.data : data;

        return {
          status_code: status_code,
          success: true,
          message: message,
          data: cleanData,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SYSTEM_MESSAGES } from './common/constants/system-messages.constant';
import { formatSysMessage } from './common/utils/formatSysMessage.util';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/interceptors/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Okrika Yard Backend Documentation')
    .setDescription(
      'This is the OPENAPI/Swagger documentation for Okrika Yard Backend',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  app.use(
    '/api/reference',
    apiReference({
      content: documentFactory,
      theme: 'purple',
      title: 'Okrika Yard Backend Reference',
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') as number | string;
  const dataSource = app.get(DataSource);

  if (dataSource.isInitialized) {
    logger.log(SYSTEM_MESSAGES.SERVER.DATABASE_STARTUP);
  } else {
    logger.error('Database connection failed. Exiting now...');
    process.exit(1);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(port);

  logger.log(formatSysMessage(SYSTEM_MESSAGES.SERVER.STARTUP, port));
  logger.log(formatSysMessage(SYSTEM_MESSAGES.SERVER.API_DOC_STARTUP, port));
  logger.log(formatSysMessage(SYSTEM_MESSAGES.SERVER.API_DOC_REFERENCE, port));
}

bootstrap();

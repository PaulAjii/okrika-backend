import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SYSTEM_MESSAGES } from './common/constants/system-messages.constant';
import { formatSysMessage } from './common/utils/formatSysMessage.util';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') as number | string;
  const dataSource = app.get(DataSource);

  logger.log('Attempting database connection...');
  logger.log(
    `Database config - Host: ${configService.get('database.host')}, Port: ${configService.get('database.port')}, User: ${configService.get('database.username')}, DB: ${configService.get('database.name')}`,
  );

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

  await app.listen(port);

  logger.log(formatSysMessage(SYSTEM_MESSAGES.SERVER.STARTUP, port));
}

bootstrap();

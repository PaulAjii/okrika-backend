import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (config: ConfigService) => ({
      //   type: 'postgres',
      //   host: config.get<string>('database.host'),
      //   port: config.get<number>('database.port'),
      //   username: config.get<string>('database.username'),
      //   password: config.get<string>('database.password'),
      //   database: config.get<string>('database.name'),
      //   autoLoadEntities: true,
      //   synchronize: config.get<string>('NODE_ENV') === 'development' || true,
      // }),
      useFactory: (config: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          database: config.get<string>('database.name'),
          autoLoadEntities: true,
          synchronize: true,
        };
        console.log('TypeORM Config:', {
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password ? '***' : 'undefined',
          database: dbConfig.database,
        });
        return dbConfig;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

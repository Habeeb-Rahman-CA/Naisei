import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, Journal, JournalPage, Tag } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'HABIZZ'),
        database: configService.get<string>('DB_DATABASE', 'naisei_dev'),
        entities: [User, Journal, JournalPage, Tag],
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        logging: configService.get<string>('DB_LOGGING') === 'true',
      }),
    }),
    TypeOrmModule.forFeature([User, Journal, JournalPage, Tag]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

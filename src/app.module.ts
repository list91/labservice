// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationService } from './migration/migration.service';
import { Sections } from './entities/sections.entity'; // Adjust the path as per your project structure

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'laborant',
      entities: [Sections],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Sections]), // Ensure Sections entity is registered
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService],
})
export class AppModule {}

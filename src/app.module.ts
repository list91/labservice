// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MigrationService } from './migration/migration.service';
import { Sections } from './entities/sections.entity'; // Adjust the path as per your project structure
import { Grades } from './entities/grades.entity';
import { Locations } from './entities/locations.entity';
import { Types } from './entities/types.entity';
import { RepositoriesFactory } from './repositories.factory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'laborant',
      entities: [Sections, Grades, Locations, Types],
      synchronize: true,
      
    }),
    TypeOrmModule.forFeature([Sections]),
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService, RepositoriesFactory],
})
export class AppModule {}

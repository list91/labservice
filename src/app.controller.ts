import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { Sections } from './entities/sections.entity';
import { MigrationService } from './migration/migration.service';

@Controller()
export class AppController {
  constructor(
              private readonly appService: AppService,
              private readonly testDB: MigrationService
  ) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    // console.log();
    this.testDB.executeSQLQuery()
    return this.appService.getHello();
  }
}

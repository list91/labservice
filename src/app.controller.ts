import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { Repository } from 'typeorm';
// import { Sections } from './entities/sections.entity';
// import { MigrationService } from './migration/migration.service';
interface RequestBody {
  type: string;
  // Другие необходимые поля
}
@Controller()
export class AppController {
  constructor(
              private readonly appService: AppService,
              // private readonly testDB: MigrationService
  ) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();
    // console.log();
    // MigrationService m = new MigrationService(Sections);
    // this.testDB.executeSQLQuery()
    // return this.appService.getHello();
    return "err"
  }
  @Post()
  runDBinit(@Body() body: RequestBody): string {
    if (body && body.type === "migrate") {
      
      return "ok"
    } else {
      return "err request"
    }
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesFactory } from './repositories.factory';
import { Grades } from './entities/grades.entity';
interface RequestBody {
  type: string;
}
@Controller()
export class AppController {
  constructor(
              private readonly appService: AppService,
              private readonly a: RepositoriesFactory,
  ) {}

  @Get()
  async getHello() {
    const qq = this.a.getRepository<Grades>("Grades")
    const res = await qq.find();
    return res
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

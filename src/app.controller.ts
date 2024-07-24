import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesFactory } from './repositories.factory';
import { Grades } from './entities/grades.entity';
import { LabItems } from './entities/labitems.entity';
import { Sections } from './entities/sections.entity';
import { Locations } from './entities/locations.entity';
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
    const qq = this.a.getRepository<Sections>("Sections")
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

  @Post('create_lab_item')
  async createLabItem(@Body() body: LabItems): Promise<LabItems> {
    const labItemsRepository = this.a.getRepository<LabItems>("LabItems");
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);
  }

  @Post('create_section')
  async createSection(@Body() body: Sections): Promise<Sections> {
    const labItemsRepository = this.a.getRepository<Sections>("Sections");
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);
  }
  @Post('create_location')
  async createLocation(@Body() body: Locations): Promise<Locations> {
    const labItemsRepository = this.a.getRepository<Locations>("Locations");
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);
  }
}
// curl http://localhost:300-X POST http://localhost:3000/create_section -H "Content-Type: application/json" -d '{
//   "sectionName": "test section2"
// }'
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

  @Post('create_item')
  async createItem(@Body() body: LabItems): Promise<LabItems> {
    const labItemsRepository = this.a.getRepository<LabItems>("LabItems");
    // console.log(body);
    // const newLabItem = labItemsRepository.create(
    //   {
    //     time: '2024-07-24 14:30:00',
    //     name: '2vrfsr',
    //     type_item: { type_name: 'тип1' },
    //     section: { section_name: 'test section2' },
    //     grade_num: { grade_num: 2 },
    //     count: 3,
    //     crash_count: 1,
    //     img: 'img/qq.png',
    //     document_item: 'docs/lsadj.pdf',
    //     location_item: { location_name: 'л2п' }
    //   }
    // ); 
    // const newLabItem = labItemsRepository.create(
    //   {
    //     time: '2024-07-24 14:30:00',
    //     name: 'lab item 1',
    //     type_item: { type_name: 'тип1' },
    //     section: { section_name: 'test section' },
    //     grade_num: { grade_num: 2 },
    //     count: 3,
    //     crash_count: 1,
    //     img: 'img/qq.png',
    //     document_item: 'docs/lsadj.pdf',
    //     location_item: { location_name: 'л2п' }
    //   }
    // );
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);
  }
}
// curl http://localhost:300-X POST http://localhost:3000/create_section -H "Content-Type: application/json" -d '{
//   "sectionName": "test section2"
// }'

// curl http://localhost:300-X POST http://localhost:3000/create_item -H "Content-Type: application/json" -d '{
//   "time": "2024-07-24 14:30:00",
//   "name": "lab item 1",
//   "type_item": "тип1",
//   "section": "test section",
//   "grade_num": "2",
//   "count": "3",
//   "crash_count": "1",
//   "img": "img/qq.png",
//   "document_item": "docs/lsadj.pdf",
//   "location_item": "л2п"
// }'
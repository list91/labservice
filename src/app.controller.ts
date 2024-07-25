import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesFactory } from './repositories.factory';
import { Grades } from './entities/grades.entity';
import { LabItems } from './entities/labitems.entity';
import { Sections } from './entities/sections.entity';
import { Locations } from './entities/locations.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface RequestBody {
  type: string;
}

import { FilesInterceptor } from '@nestjs/platform-express';

import * as multer from 'multer';
import { FileService } from './file/file.service';


const upload = multer({ dest: 'uploads/' }); // Папка, куда сохранять загруженные файлы
@Controller()
export class AppController {
  private img_path = "imgs";
  private doc_path = "docs";
  private path = __dirname;
  constructor(
              private readonly appService: AppService,
              private readonly a: RepositoriesFactory,
              private readonly fService: FileService
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
  @UseInterceptors(FilesInterceptor('files'))
  async createItem(@UploadedFiles() files, @UploadedFile() file, @Body() body: any): Promise<any> {
    console.log(files); // Загруженные файлы
    // console.log(file); // Один файл, если отправляется только один файл
    // console.log(body); // Другие данные из запроса

    // return 'Files uploaded successfully';
    const savedFileNames = await this.fService.saveFiles(files);
    return savedFileNames;
  }
  // curl -X POST http://localhost:3000/create_item \
  // -F 'time=2024-07-24 14:30:00' \
  // -F 'name=lab item 1' \
  // -F 'type_item[type_name]=тип1' \
  // -F 'section[section_name]=test section' \
  // -F 'grade_num[grade_num]=2' \
  // -F 'count=3' \
  // -F 'crash_count=1' \
  // -F 'location_item[location_name]=л2п' \
  // -F 'files=@/home/user/link-preview.svg' \
  // -F 'files=@/home/user/Загрузки/Telegram Desktop/ШУ Алтай/РЭ УС серии Алтай.pdf'


  // @UseInterceptors(FileInterceptor('img'), FileInterceptor('doc'))
// @Post('create_item')
// @UseInterceptors(FileInterceptor('img'), FileInterceptor('doc'))
// async createItem(@Body() body: LabItems, @UploadedFiles() files): Promise<LabItems> {
//     console.log(files)
//     const labItemsRepository = this.a.getRepository<LabItems>("LabItems");
//     // body.img = files.img[0].path; // Путь к изображению
//     // body.document_item = files.doc[0].path; // Путь к документу
//     // const newLabItem = labItemsRepository.create(body);
//     // await labItemsRepository.save(newLabItem);
//     // // Сохранение файлов на сервере
//     // const uniqueImageName = `${uuidv4()}-${files.img[0].originalname}`;
//     // const uniqueDocName = `${uuidv4()}-${files.doc[0].originalname}`;
//     // Полный путь для сохранения файлов
    


//     // const imagePath = __dirname.join(this.img_path, uniqueImageName);
//     // const docPath = __dirname.join(this.doc_path, uniqueDocName);
    
//     // fs.copyFileSync(files.img[0].path, imagePath);
//     // fs.copyFileSync(files.doc[0].path, docPath);

//     const newLabItem = labItemsRepository.create(body);
//     // return newLabItem;
//     return await labItemsRepository.save(newLabItem);

// }
  // @Post('create_item')
  // async createItem(@Body() body: LabItems): Promise<LabItems> {
  //   const labItemsRepository = this.a.getRepository<LabItems>("LabItems");
  //   console.log(files)
  //   const newLabItem = labItemsRepository.create(body);
  //   return await labItemsRepository.save(newLabItem);
  // }
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
//   "img": "@/home/user/link-preview.svg",
//   "document_item": "@/home/user/Загрузки/Telegram Desktop/ШУ Алтай/РЭ УС серии Алтай.pdf",
//   "location_item": "л2п"
// }'
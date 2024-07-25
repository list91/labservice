import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RepositoriesFactory } from './repositories.factory';
import { Grades } from './entities/grades.entity';
import { LabItems } from './entities/labitems.entity';
import { Sections } from './entities/sections.entity';
import { Locations } from './entities/locations.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { FileService } from './file/file.service';

interface RequestBody {
  type: string;
}

const upload = multer({ dest: 'uploads/' }); // Папка, куда сохранять загруженные файлы
@Controller()
export class AppController {
  constructor(
              private readonly a: RepositoriesFactory,
              private readonly fService: FileService
  ) {}

  @Get()
  async getHello() {
      const qq = this.a.getRepository<LabItems>("LabItems");
      const res = await qq.find({ relations: ['type_item', 'section', 'grade_num', 'location_item'] });
      return res;
  }

  @Post()
  runDBinit(@Body() body: RequestBody): string {
    if (body && body.type === "migrate") {
      return "ok"
    } else {
      return "err request"
    }
  }

  @Post('create_location')
  async createLocation(@Body() body: Locations): Promise<Locations> {
    const labItemsRepository = this.a.getRepository<Locations>("Locations");
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);
  }

  @Post('create_item')
  @UseInterceptors(FilesInterceptor('files'))
  async createItem(@UploadedFiles() files, @UploadedFile() file, @Body() body: LabItems): Promise<any> {
    const savedFileNames = await this.fService.saveFiles(files);
    const labItemsRepository = this.a.getRepository<LabItems>("LabItems");
    body.img = savedFileNames[0]
    body.document_item = savedFileNames[1]
    const newLabItem = labItemsRepository.create(body);
    return await labItemsRepository.save(newLabItem);    
  }

  @Delete(':id')
  async deleteLabItem(@Param('id') id: number) {
    const qq = this.a.getRepository<LabItems>("LabItems");
    const itemToDelete = await qq.findOne({ where: { id } }); // Находим запись по ID
    if (!itemToDelete) {
      throw new NotFoundException('Lab item not found');
    }
    await qq.remove(itemToDelete); // Удаляем запись
    this.fService.deleteFiles([itemToDelete.img, itemToDelete.document_item]);
    return itemToDelete;
  }
}
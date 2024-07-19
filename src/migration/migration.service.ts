// migration.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sections } from '../entities/sections.entity'; // Adjust the path as per your project structure

@Injectable()
export class MigrationService {
  constructor(
    @InjectRepository(Sections)
    private readonly sectionsRepository: Repository<Sections>,
  ) {}

  async runMigrations() {
    try {
      await this.someMigrationMethod();
      await this.executeSQLQuery();
    } catch (error) {
      console.error('Ошибка при выполнении миграций:', error);
      throw error;
    }
  }

  private async someMigrationMethod() {
    console.log('Выполняется метод миграции 1');
  }

  async executeSQLQuery() {
    // select * from sections;
    try {
      const sections = await this.sectionsRepository.find();
      console.log('Результат SQL запроса:', sections);
    } catch (error) {
      console.error('Ошибка при выполнении SQL запроса:', error);
      throw error;
    }
  }
}

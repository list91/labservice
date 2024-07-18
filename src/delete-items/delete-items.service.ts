// deleteItems.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Item } from './path-to-your-item.entity'; // Путь к вашей сущности Item

@Injectable()
export class DeleteItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async deleteItems(tableName: string, ids: number[]): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(tableName)
      .whereInIds(ids)
      .execute();
  }
}

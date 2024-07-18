import { Test, TestingModule } from '@nestjs/testing';
import { DeleteItemsService } from './delete-items.service';

describe('DeleteItemsService', () => {
  let service: DeleteItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteItemsService],
    }).compile();

    service = module.get<DeleteItemsService>(DeleteItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

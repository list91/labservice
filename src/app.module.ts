import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeleteItemsService } from './delete-items/delete-items.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DeleteItemsService],
})
export class AppModule {}

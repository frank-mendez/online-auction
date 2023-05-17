import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}

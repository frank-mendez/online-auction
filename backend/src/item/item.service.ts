import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { AddItemDto } from './dto/add-item-dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly model: Model<ItemDocument>,
  ) {}

  async createItem(addItemDto: AddItemDto): Promise<ItemDocument> {
    return await new this.model({
      ...addItemDto,
    }).save();
  }

  async getAllUserItem(id: string): Promise<ItemDocument[]> {
    return await this.model.find({ author: id });
  }
}

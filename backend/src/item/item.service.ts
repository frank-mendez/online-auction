import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddItemDto } from './dto/add-item-dto';
import { BidItemDto } from './dto/bid-item-dto';
import { Item, ItemDocument } from '../schemas/item.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly model: Model<ItemDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createItem(addItemDto: AddItemDto): Promise<ItemDocument | Item> {
    return await new this.model({
      ...addItemDto,
    }).save();
  }

  async getItem(itemId: string): Promise<ItemDocument | Item> {
    return await this.model
      .findById(itemId)
      .populate('author', ['email'])
      .populate('currentBidder', ['email'])
      .lean()
      .exec();
  }

  async getAllUserItem(id: string): Promise<ItemDocument[] | Item[]> {
    return await this.model
      .find({ author: id })
      .populate('author', ['email'])
      .exec();
  }

  async getAllItems(): Promise<ItemDocument[] | Item[]> {
    return await this.model.find().populate('author', ['email']).exec();
  }

  async bidItem(bidItemDto: BidItemDto): Promise<ItemDocument | Item> {
    const item = await this.model.findById(bidItemDto.itemId);
    const user = await this.userModel.findById(bidItemDto.bidder);
    if (item.currentBidder === bidItemDto.bidder) {
      throw new Error('Your are already the current highest bidder');
    }
    if (user.balance < item.currentPrice) {
      throw new Error('Your balance is less than current bid price');
    }
    if (
      item.currentPrice >= bidItemDto.bidPrice ||
      item.startPrice >= bidItemDto.bidPrice
    ) {
      throw new Error('Current price is greater than bid price');
    }

    const balance = user.balance - bidItemDto.bidPrice;
    user.balance = balance;
    user.save();

    item.currentPrice = bidItemDto.bidPrice;
    item.currentBidder = bidItemDto.bidder;

    item.save();
    return item;
  }
}

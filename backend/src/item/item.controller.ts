import { JwtAuthGuard } from './../auth/jwt.auth.guard';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { AddItemDto } from './dto/add-item-dto';
import { BidItemDto } from './dto/bid-item-dto';
import { Item, ItemDocument } from '../schemas/item.schema';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() addItemDto: AddItemDto): Promise<ItemDocument | Item> {
    try {
      const item = await this.itemService.createItem(addItemDto);
      return item;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserItem(@Param('id') id: string): Promise<ItemDocument[] | Item[]> {
    try {
      const items = await this.itemService.getAllUserItem(id);
      return items;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllItems(): Promise<ItemDocument[] | Item[]> {
    try {
      const items = await this.itemService.getAllItems();
      return items;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('bid')
  async bid(@Body() bidItemDto: BidItemDto): Promise<ItemDocument | Item> {
    try {
      const item = await this.itemService.bidItem(bidItemDto);
      return item;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ItemService } from './item.service';
import { AddItemDto } from './dto/add-item-dto';
import { ItemDocument } from 'src/schemas/item.schema';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() addItemDto: AddItemDto): Promise<ItemDocument> {
    try {
      const item = await this.itemService.createItem(addItemDto);
      return item;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

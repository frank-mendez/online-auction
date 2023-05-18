import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';
import * as bcrypt from 'bcryptjs';
import { UserDepositDto } from './dto/user-deposit-dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UserDocument } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() userDto: UserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    userDto.password = hashedPassword;

    try {
      const user = await this.userService.register(userDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(@Body() userDepositDto: UserDepositDto): Promise<UserDocument> {
    try {
      const user = await this.userService.deposit(userDepositDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

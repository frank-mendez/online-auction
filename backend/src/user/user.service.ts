import { User, UserDocument } from './../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user-dto';
import { UserDepositDto } from './dto/user-deposit-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async register(userRegister: UserDto): Promise<UserDocument | User> {
    return await new this.model({
      ...userRegister,
    }).save();
  }

  async findOne(email: string): Promise<UserDocument | User> {
    return await this.model.findOne({ email }).exec();
  }

  async deposit(userDepositDto: UserDepositDto): Promise<UserDocument | User> {
    const user = await this.model.findById(userDepositDto.id);
    if (user.balance) {
      const balance = user.balance + userDepositDto.deposit;
      user.balance = balance;
    } else {
      user.balance = userDepositDto.deposit;
    }
    user.save();
    return user;
  }
}

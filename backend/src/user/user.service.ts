import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async register(userRegister: UserDto): Promise<UserDocument> {
    return await new this.model({
      ...userRegister,
      createdAt: new Date(),
    }).save();
  }
}

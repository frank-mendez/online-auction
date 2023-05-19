import { User, UserDocument } from '../schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<UserDocument | User> {
    const { username, password } = authDto;
    const user = await this.userService.findOne(username);
    if (user) {
      const passwordValid = await bcrypt.compare(password, user.password);

      if (passwordValid) {
        return user;
      } else {
        throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
      }
    }

    throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
  }

  async login(user: UserDocument) {
    const payload = {
      email: user.email,
      id: user._id,
    };
    return {
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
        ...payload,
      },
    };
  }
}

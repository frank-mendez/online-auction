import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Model, connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AuthController } from './auth.controller';
import { UserController } from '../user/user.controller';
import { UserDocumentStub } from '../user/user-stub-dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController, AuthController],
      providers: [
        UserService,
        AuthService,
        JwtService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();
    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
    jwtService = app.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(UserDocumentStub());
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.validateUser(authDto);

      expect(result).toEqual(UserDocumentStub());
    });

    it('should throw HttpException if credentials are invalid', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(UserDocumentStub());
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(authService.validateUser(authDto)).rejects.toThrow(
        new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN),
      );
    });

    it('should throw HttpException if user is not found', async () => {
      const authDto: AuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(authService.validateUser(authDto)).rejects.toThrow(
        new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN),
      );
    });
  });
});

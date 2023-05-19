import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import {
  UserDepositSubDto,
  UserDocumentStub,
  UserStubDto,
} from './user-stub-dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();
    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
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
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return the saved object', async () => {
      const createdUser = await controller.register(UserStubDto());
      expect(createdUser.email).toBe(UserStubDto().email);
    });

    it('should return Email already exist (Bad Request - 400) exception', async () => {
      await new userModel(UserStubDto()).save();
      await expect(controller.register(UserStubDto())).rejects.toThrow(
        'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test@test.com" }',
      );
    });
  });

  describe('deposit', () => {
    it('should deposit amount successfully', async () => {
      jest.spyOn(service, 'deposit').mockResolvedValue(UserDocumentStub());

      const result = await controller.deposit(UserDepositSubDto());

      expect(service.deposit).toHaveBeenCalledWith(UserDepositSubDto());
      expect(result).toEqual(UserDocumentStub());
    });

    it('should throw an error if deposit fails', async () => {
      const error = new Error('Deposit failed');
      jest.spyOn(service, 'deposit').mockRejectedValue(error);

      await expect(
        controller.deposit(UserDepositSubDto()),
      ).rejects.toThrowError(
        new HttpException(error.message, HttpStatus.BAD_REQUEST),
      );
    });
  });
});

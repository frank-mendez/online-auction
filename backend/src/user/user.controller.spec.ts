import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UserStubDto } from './user-stub-dto';
import { UserAlreadyExists } from './user-already-exists-excemption';

describe('UserController', () => {
  let controller: UserController;
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

  describe('Register User', () => {
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
});

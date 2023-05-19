import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserController } from '../user/user.controller';
import { getModelToken } from '@nestjs/mongoose';
import { UserDocumentStub } from '../user/user-stub-dto';
import * as dotenv from 'dotenv';
dotenv.config();

describe('AuthController', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let authController: AuthController;

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
    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
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
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with the user from the request', async () => {
      // Arrange
      const user = { email: 'testuser@test.com', password: 'testpassword' };
      const req = { user };
      const authServiceLoginSpy = jest.spyOn(authService, 'login');
      const jwtServiceSignSpy = jest.spyOn(jwtService, 'sign');

      // Act
      const result = await authController.login(req);

      // Assert
      expect(authServiceLoginSpy).toHaveBeenCalledWith(user);
      expect(jwtServiceSignSpy).toBeCalled();
      expect(result).toHaveProperty('data.email', 'testuser@test.com');
    });
  });
});

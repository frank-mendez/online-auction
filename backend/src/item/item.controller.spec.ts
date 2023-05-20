import { Item, ItemSchema } from './../schemas/item.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Connection, Model, connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserController } from '../user/user.controller';
import { ItemService } from './item.service';
import {
  BidItemStubDto,
  ItemStubDocuments,
  ItemStubDto,
} from './item-stub-dto';
import { ItemController } from './item.controller';
import { UserStubDto } from '../user/user-stub-dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ItemService', () => {
  let itemService: ItemService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let itemModel: Model<Item>;
  let itemController: ItemController;
  let userController: UserController;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    itemModel = mongoConnection.model(Item.name, ItemSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController, ItemController],
      providers: [
        UserService,
        ItemService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: getModelToken(Item.name), useValue: itemModel },
      ],
    }).compile();
    itemService = app.get<ItemService>(ItemService);
    itemController = app.get<ItemController>(ItemController);
    userController = app.get<UserController>(UserController);
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
    expect(itemController).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createdUser = await userController.register(UserStubDto());
      const itemCreated = await itemController.create(ItemStubDto(createdUser));
      expect(itemCreated.name).toBe(ItemStubDto().name);
    });
  });

  describe('getUserItem', () => {
    it('should get all items for a user', async () => {
      jest
        .spyOn(itemService, 'getAllUserItem')
        .mockResolvedValue(ItemStubDocuments());

      expect(await itemController.getUserItem('123')).toStrictEqual(
        ItemStubDocuments(),
      );
    });

    it('should throw an error if getting user items fails', async () => {
      const userId = 'test-user-id';
      const error = new Error('Failed to get user items');
      jest.spyOn(itemService, 'getAllUserItem').mockRejectedValue(error);

      await expect(itemController.getUserItem(userId)).rejects.toThrowError(
        new HttpException(error.message, HttpStatus.BAD_REQUEST),
      );
    });
  });
});

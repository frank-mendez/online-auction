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

describe('ItemService', () => {
  let itemService: ItemService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let itemModel: Model<Item>;

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
    expect(itemService).toBeDefined();
  });

  describe('createItem', () => {
    it('should create a new item', async () => {
      jest
        .spyOn(itemModel.prototype, 'save')
        .mockResolvedValueOnce(ItemStubDto());

      const result = await itemService.createItem(ItemStubDto());

      expect(result).toEqual(ItemStubDto());
      expect(itemModel.prototype.save).toHaveBeenCalledWith();
    });
  });

  describe('getAllUserItem', () => {
    it('should return all items for a user', async () => {
      jest.spyOn(itemModel, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(ItemStubDocuments()),
        }),
      } as any);

      const result = await itemService.getAllUserItem('123');

      expect(result).toEqual(ItemStubDocuments());
      expect(itemModel.find).toHaveBeenCalledWith({ author: '123' });
    });
  });

  describe('getAllItems', () => {
    it('should return all items', async () => {
      jest.spyOn(itemModel, 'find').mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec: jest.fn().mockResolvedValueOnce(ItemStubDocuments()),
        }),
      } as any);

      const result = await itemService.getAllItems();

      expect(result).toEqual(ItemStubDocuments());
      expect(itemModel.find).toHaveBeenCalledWith();
    });
  });
});

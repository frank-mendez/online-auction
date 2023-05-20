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
  let itemController: ItemController;

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
      const itemCreated = await itemController.create(ItemStubDto());
      expect(itemCreated.name).toBe(ItemStubDto().name);
    });
  });
});

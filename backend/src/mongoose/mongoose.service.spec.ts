import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from './mongoose.service';

describe('MongooseConfigService', () => {
  let service: MongooseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigService],
    }).compile();

    service = module.get<MongooseConfigService>(MongooseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMongooseOptions', () => {
    it('should return an object with the correct properties', async () => {
      const options = await service.createMongooseOptions();
      expect(options).toHaveProperty('uri');
      expect(options).toHaveProperty('autoIndex');
      expect(options).toHaveProperty('autoCreate');
      expect(options).toHaveProperty('dbName');
    });

    it('should return an object with the correct values', async () => {
      process.env.MONGODB_URL = 'mongodb://localhost:27017';
      process.env.MONGODB_NAME = 'test-db';
      const options = await service.createMongooseOptions();
      expect(options.uri).toEqual('mongodb://localhost:27017');
      expect(options.autoIndex).toEqual(true);
      expect(options.autoCreate).toEqual(true);
      expect(options.dbName).toEqual('test-db');
    });
  });
});

import { User } from '../schemas/user.schema';
import { Item, ItemDocument } from '../schemas/item.schema';
import { UserDocumentStub } from '../user/user-stub-dto';
import { AddItemDto } from './dto/add-item-dto';
import { BidItemDto } from './dto/bid-item-dto';

export const ItemStubDto = (user?: User): AddItemDto => {
  return {
    name: 'Test Item',
    startPrice: 200,
    duration: '1h',
    author: user ? user : UserDocumentStub(),
  };
};

export const BidItemStubDto = (): BidItemDto => {
  return {
    itemId: '123',
    bidPrice: 123,
    bidder: UserDocumentStub(),
  };
};

export const ItemStubDocuments = (): Item[] => {
  return [
    {
      name: 'Test Item 1',
      status: 'On-going',
      duration: '1h',
      startPrice: 10,
      currentPrice: 10,
      currentBidder: UserDocumentStub(),
      author: UserDocumentStub(),
    },
    {
      name: 'Test Item 2',
      status: 'On-going',
      duration: '1h',
      startPrice: 10,
      currentPrice: 10,
      currentBidder: UserDocumentStub(),
      author: UserDocumentStub(),
    },
  ];
};

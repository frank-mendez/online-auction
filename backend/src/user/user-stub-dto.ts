import { UserDto } from 'src/user/dto/user-dto';
import { UserDepositDto } from './dto/user-deposit-dto';
import { User, UserDocument } from '../schemas/user.schema';

export const UserStubDto = (): UserDto => {
  return {
    email: 'test@test.com',
    password: 'NrdI7YSla9NycalH!',
  };
};

export const UserDepositSubDto = (): UserDepositDto => {
  return {
    deposit: 100,
    id: '6463caaa3589611eeecab535',
  };
};

export const UserDocumentStub = (): User => {
  return {
    email: 'frankmendezresources@gmail.com',
    password: '$2a$10$dv71iWYHMEewUlQ0vyET2eypIaMrVVCOYAfeJIC7ImQQUnVQwSZnq',
    balance: 5000,
  };
};

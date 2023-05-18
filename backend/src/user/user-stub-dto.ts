import { UserDto } from 'src/user/dto/user-dto';

export const UserStubDto = (): UserDto => {
  return {
    email: 'test@test.com',
    password: 'NrdI7YSla9NycalH!',
  };
};

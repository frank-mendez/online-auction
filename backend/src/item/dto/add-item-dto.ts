import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { User } from '../../schemas/user.schema';

export class AddItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  startPrice: number;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  @IsString()
  author: User;
}

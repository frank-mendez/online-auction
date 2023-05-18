import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { User } from 'src/schemas/user.schema';

export class BidItemDto {
  @IsNotEmpty()
  itemId: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  bidPrice: number;

  @IsNotEmpty()
  @IsString()
  bidder: User;
}

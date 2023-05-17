import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  startPrice: number;

  @IsNotEmpty()
  duration: Date;

  @IsNotEmpty()
  @IsString()
  author: string;
}

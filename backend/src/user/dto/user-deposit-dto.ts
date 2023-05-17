import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UserDepositDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  deposit: number;

  @IsNotEmpty()
  id: string;
}

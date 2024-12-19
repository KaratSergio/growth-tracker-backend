import { IsNumber, IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsNumber()
  userId: number;

  @IsString()
  refreshToken: string;
}

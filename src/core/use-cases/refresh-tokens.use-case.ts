import { Injectable } from '@nestjs/common';

import { AuthService } from '@infrastructure/auth/auth.service';
import { RefreshTokensDto } from '@shared/dtos/refresh-token.dto';

@Injectable()
export class RefreshTokensUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(refreshTokensDto: RefreshTokensDto) {
    const { userId, refreshToken } = refreshTokensDto;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

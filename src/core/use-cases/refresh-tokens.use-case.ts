import { Injectable } from '@nestjs/common';

import { AuthService } from '@infrastructure/auth/auth.service';

@Injectable()
export class RefreshTokensUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(userId: number, refreshToken: string) {
    console.log(
      `Refreshing tokens for userId: ${userId}, refreshToken: ${refreshToken}`,
    );
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

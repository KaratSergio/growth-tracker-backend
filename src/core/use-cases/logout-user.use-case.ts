import { Injectable } from '@nestjs/common';

import { AuthService } from '@infrastructure/auth/auth.service';

@Injectable()
export class LogoutUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(userId: number, accessToken: string) {
    await this.authService.logout(userId, accessToken);
  }
}

import { Injectable } from '@nestjs/common';

import { AuthService } from '@infrastructure/auth/auth.service';

@Injectable()
export class LogoutUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(req: any) {
    const userId = req.user.id;
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!userId || !accessToken) {
      throw new Error('Invalid logout request');
    }

    await this.authService.logout(userId, accessToken);
  }
}

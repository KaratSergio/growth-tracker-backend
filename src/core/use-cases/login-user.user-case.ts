import { Injectable } from '@nestjs/common';

import { AuthService } from '@infrastructure/auth/auth.service';
import { LoginUserDto } from '@shared/dtos/login-user.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    return this.authService.login(user);
  }
}

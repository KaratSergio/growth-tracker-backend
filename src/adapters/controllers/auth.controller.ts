import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { CreateUserUseCase } from '@core/use-cases/create-user.use-case';
import { LoginUserUseCase } from '@core/use-cases/login-user.user-case';
import { LogoutUserUseCase } from '@core/use-cases/logout-user.use-case';
import { RefreshTokensUseCase } from '@core/use-cases/refresh-tokens.use-case';
import { JwtAuthGuard } from '@infrastructure/auth/jwt.guard';
import { CreateUserDto } from '@shared/dtos/create-user.dto';
import { LoginUserDto } from '@shared/dtos/login-user.dto';
import { RefreshTokensDto } from '@shared/dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokensUseCase: RefreshTokensUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
  ) {}

  @Post('refresh')
  async refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
    return this.refreshTokensUseCase.execute(refreshTokensDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any) {
    await this.logoutUserUseCase.execute(req);
  }
}

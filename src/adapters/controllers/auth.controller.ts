import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserUseCase } from '@core/use-cases/create-user.use-case';
import { LoginUserUseCase } from '@core/use-cases/login-user.user-case';
import { CreateUserDto } from '@shared/dtos/create-user.dto';
import { LoginUserDto } from '@shared/dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}

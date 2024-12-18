import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@adapters/controllers/auth.controller';
import { UserRepositoryAdapter } from '@adapters/repositories/user.repository';
import { CreateUserUseCase } from '@core/use-cases/create-user.use-case';
import { LoginUserUseCase } from '@core/use-cases/login-user.user-case';
import { LogoutUserUseCase } from '@core/use-cases/logout-user.use-case';
import { RefreshTokensUseCase } from '@core/use-cases/refresh-tokens.use-case';
import { PrismaModule } from '@infrastructure/database/prisma.module';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    CreateUserUseCase,
    LoginUserUseCase,
    RefreshTokensUseCase,
    LogoutUserUseCase,
    { provide: 'UserRepository', useClass: UserRepositoryAdapter },
  ],
  exports: [AuthService],
})
export class AuthModule {}

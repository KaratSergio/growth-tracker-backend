import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@adapters/controllers/auth.controller';
import { UserRepositoryAdapter } from '@adapters/repositories/user.repository';
import { CreateUserUseCase } from '@core/use-cases/create-user.use-case';
import { LoginUserUseCase } from '@core/use-cases/login-user.user-case';
import { PrismaModule } from '@infrastructure/database/prisma.module';

import { AuthService } from './auth.service';
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
    JwtStrategy,
    CreateUserUseCase,
    LoginUserUseCase,
    { provide: 'UserRepository', useClass: UserRepositoryAdapter },
  ],
  exports: [AuthService],
})
export class AuthModule {}

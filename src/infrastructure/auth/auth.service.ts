import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '@core/entities/user.entity';
import { UserRepository } from '@core/repositories/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(userId: number) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    await this.userRepository.updateRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userRepository.findById(userId);

    console.log('Found user:', user);

    if (!user || user.refreshToken !== refreshToken) {
      console.log(`Stored refresh token: ${user.refreshToken}`);
      console.log(`Provided refresh token: ${refreshToken}`);
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(userId);
  }

  async revokeAccessToken(token: string) {
    await this.userRepository.revokeToken(token);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.generateTokens(user.id);
  }

  async logout(userId: number, accessToken: string) {
    await this.revokeAccessToken(accessToken);
    await this.userRepository.updateRefreshToken(userId, null);
  }
}

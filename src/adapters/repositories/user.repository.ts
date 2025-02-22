import { Injectable } from '@nestjs/common';

import { User } from '@core/entities/user.entity';
import { UserRepository } from '@core/repositories/user.repository.interface';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
      },
    });
    return new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.passwordHash,
      newUser.createdAt,
      newUser.updatedAt,
    );
  }

  async findById(id: number): Promise<User | null> {
    console.log(`Searching for user with id: ${id}`);
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.passwordHash,
          user.createdAt,
          user.updatedAt,
          user.refreshToken,
        )
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.passwordHash,
          user.createdAt,
          user.updatedAt,
        )
      : null;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.passwordHash,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string | null,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async revokeToken(token: string): Promise<void> {
    await this.prisma.revokedToken.create({
      data: { token },
    });
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.prisma.revokedToken.findUnique({
      where: { token },
    });
    return !!revokedToken;
  }
}

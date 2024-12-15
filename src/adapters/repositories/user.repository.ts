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
    const user = await this.prisma.user.findUnique({ where: { id } });
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
}

import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '@shared/dtos/create-user.dto';

import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
    };

    return this.userRepository.create(userData);
  }
}

import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '@adapters/dtos/create-user.dto';

import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository.interface';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

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

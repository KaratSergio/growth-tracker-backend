import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { CreateUserDto } from '@adapters/dtos/create-user.dto';
import { CreateUserUseCase } from '@core/use-cases/create-user.use-case';
import { PrismaUserRepository } from '@infrastructure/database/prisma-user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: PrismaUserRepository) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUserUseCase = new CreateUserUseCase(this.userRepository);
    return createUserUseCase.execute(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userRepository.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userRepository.delete(id);
  }
}

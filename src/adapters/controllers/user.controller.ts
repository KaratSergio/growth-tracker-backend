import { Controller, Get, Param, Delete } from '@nestjs/common';

import { UserRepositoryAdapter } from '@adapters/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepositoryAdapter) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userRepository.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userRepository.delete(id);
  }
}

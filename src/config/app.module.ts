import { Module } from '@nestjs/common';

import { UserController } from '@adapters/controllers/user.controller';
import { PrismaUserRepository } from '@infrastructure/database/prisma-user.repository';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, PrismaUserRepository],
})
export class AppModule {}

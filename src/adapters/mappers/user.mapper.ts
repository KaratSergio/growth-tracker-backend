import { User } from '@core/entities/user.entity';
import { CreateUserDto } from '@shared/dtos/create-user.dto';

export class UserMapper {
  static toEntity(createUserDto: CreateUserDto): User {
    return new User(
      undefined, // id буде створений у БД
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      new Date(),
      new Date(),
    );
  }

  static toDto(user: User): CreateUserDto {
    return {
      name: user.name,
      email: user.email,
      password: user.passwordHash,
    };
  }
}

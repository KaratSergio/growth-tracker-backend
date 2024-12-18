import { User } from '@core/entities/user.entity';

export interface UserRepository {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;

  updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
  revokeToken(token: string): Promise<void>;
  isTokenRevoked(token: string): Promise<boolean>;
}

import User from '@/models/User';
import UserRepository from '../interfaces/UserRepository';

export default class UserRepositoryPrisma implements UserRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    return {
      id: 1,
      name: 'Danilo',
      email: email,
      password: '123456',
      role: 'admin'
    };
  }
}

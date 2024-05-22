import User from '@/models/User';

export default interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
}

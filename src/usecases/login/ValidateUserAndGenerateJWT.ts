import HashGenerator from '@/adapters/interfaces/crypto/HashGenerator';
import JWTGenerator from '@/adapters/interfaces/crypto/JWTGenerator';
import UserRepository from '@/data/repositories/interfaces/UserRepository';

export default class ValidateUserAndGenerateJWT {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
    private readonly jwtGenerator: JWTGenerator
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return Promise.resolve(null);
    const isPasswordValid = await this.hashGenerator.compare(password, user.password);
    if (!isPasswordValid) return Promise.resolve(null);
    const token = await this.jwtGenerator.generate(user);
    return Promise.resolve(token);
  }
}

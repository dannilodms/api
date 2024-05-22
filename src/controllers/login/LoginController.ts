import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpResponse from '@/adapters/interfaces/http/HttpResponse';
import Controller from '@/controllers/interfaces/Controller';
import { UserLoginParser } from '@/controllers/login/dto/UserLogin';
import UserRepository from '@/data/repositories/interfaces/UserRepository';
// import { badRequest, ok, serverError } from '@/helpers/HttpHelpers';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/HttpHelpers';

export default class LoginController implements Controller {
  constructor(
    private readonly userLoginParser: UserLoginParser,
    private readonly userRepository: UserRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.userLoginParser.parse(req.body);
      if (!result.isValid) return badRequest(result.errors);

      const { email, password } = result.data;
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) return unauthorized('Usuário ou senha inválidos');

      return ok(user);
    } catch (error: any) {
      console.error(error);
      return serverError(error);
    }
  }
}

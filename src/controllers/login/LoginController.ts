import HttpRequest from '@/adapters/interfaces/http/HttpRequest';
import HttpResponse from '@/adapters/interfaces/http/HttpResponse';
import Controller from '@/controllers/interfaces/Controller';
import { UserLoginParser } from '@/controllers/login/dto/UserLoginDTO';
import ValidateUserAndGenerateJWT from '@/usecases/login/ValidateUserAndGenerateJWT';
// import { badRequest, ok, serverError } from '@/helpers/HttpHelpers';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/HttpHelpers';

export default class LoginController implements Controller {
  constructor(
    private readonly userLoginParser: UserLoginParser,
    private readonly validateUserAndGenerateJWT: ValidateUserAndGenerateJWT
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.userLoginParser.parse(req.body);
      if (!result.isValid) return badRequest({ message: result.errors });
      const { email, password } = result.data;
      const jwtToken = await this.validateUserAndGenerateJWT.execute(email, password);
      if (!jwtToken) return unauthorized({ message: 'Usuário ou senha inválidos' });
      return ok({ token: jwtToken });
    } catch (error: any) {
      console.error(error);
      return serverError(error);
    }
  }
}

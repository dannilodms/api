import JWTGeneratorJsonWebToken from '@/adapters/implementations/crypto/JSONWebToken/JWTGeneratorJsonWebToken';
import HashBcrypt from '@/adapters/implementations/crypto/bcrypt/HashBcrypt';
import { expressHttpRouteAdapter } from '@/adapters/implementations/http/express/ExpressHttpRouteAdapter';
import LoginController from '@/controllers/login/LoginController';
import UserLoginParserImpl from '@/controllers/login/dto/UserLoginDTO';
import UserRepositoryPrisma from '@/data/repositories/prisma/UserRepositoryPrisma';
import ValidateUserAndGenerateJWT from '@/usecases/login/ValidateUserAndGenerateJWT';

const userLoginParser = new UserLoginParserImpl();

const userRepository = new UserRepositoryPrisma();
const hashGenerator = new HashBcrypt();
const jwtGenerator = new JWTGeneratorJsonWebToken(String(process.env.JWT_SECRET || 'jwt_secret_key'));
const validateUserAndGenerateJWT = new ValidateUserAndGenerateJWT(userRepository, hashGenerator, jwtGenerator);

const loginController = new LoginController(userLoginParser, validateUserAndGenerateJWT);
const route = expressHttpRouteAdapter.adapt(loginController);

export default route;

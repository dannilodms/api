import { z } from 'zod';

import ParseDTOResponse from '@/controllers/interfaces/ParseDTOResponse';

const userLoginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Senha inválida' })
});

export type UserLogin = z.infer<typeof userLoginSchema>;
export interface UserLoginParser {
  parse(userLoginObject: any): ParseDTOResponse<UserLogin>;
}
export default class UserLoginParserImpl implements UserLoginParser {
  parse(userLoginObject: any): ParseDTOResponse<UserLogin> {
    const result = userLoginSchema.safeParse(userLoginObject);
    if (result.success)
      return {
        isValid: true,
        data: result.data
      };

    return {
      isValid: false,
      errors: result.error.errors.map(error => error.message)
    };
  }
}

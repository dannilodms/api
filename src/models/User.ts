export type UserRole = 'user' | 'admin';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export default User;

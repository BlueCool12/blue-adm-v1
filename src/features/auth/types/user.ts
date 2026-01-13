export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: string;
  loginId: string;
  name: string;
  nickname: string;
  role: UserRole;
}
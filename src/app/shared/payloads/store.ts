import { User } from '../models/user';

export interface AuthenticateSuccessPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
  user: User;
  redirect: boolean;
}

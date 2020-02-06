import { User } from '../models/user';

export interface UserData {
  accessToken: string;
  refreshToken: string;
  expirationDate: number;
  refreshTokenExpirationDate: number;
  user: User;
}

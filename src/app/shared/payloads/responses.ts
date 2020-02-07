
import { Pageable, Sort } from './pagination';
import { User } from '../models/user';

export interface CreateResponseSuccess<T> {
  message: string;
  client: T;
}

export interface DeleteResponseSuccess {
  message: string;
}

export interface NotFoundError {
  message: string;
}

export interface DataAccessError {
  message: string;
  error: string;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface OAuth2ResponseSuccess {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  scope: string;
  user: User;
  jti: string;
}

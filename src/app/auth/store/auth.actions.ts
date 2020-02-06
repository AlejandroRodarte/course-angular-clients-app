import { Action } from '@ngrx/store';
import { LoginRequest } from './../../shared/payloads/requests';
import { AuthenticateSuccessPayload } from 'src/app/shared/payloads/store';

export const AUTHENTICATE_START = '[Auth] Authenticate Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';

export const AUTO_LOGIN = '[Auth] Auto Login';

export const LOGOUT = '[Auth] Logout';

export const RENOVATE_TOKEN_START = '[Auth] Renovate Token Start';

export type AuthActions =
AuthenticateStart |
AuthenticateSuccess |
AuthenticateFail |
AutoLogin |
Logout |
RenovateTokenStart;

export class AuthenticateStart implements Action {

  readonly type = AUTHENTICATE_START;

  constructor(
    public payload: LoginRequest
  ) { }

}

export class AuthenticateSuccess implements Action {

  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: AuthenticateSuccessPayload
  ) { }

}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class RenovateTokenStart implements Action {

  readonly type = RENOVATE_TOKEN_START;

  constructor(
    public payload: {
      fromService: boolean
      refreshToken?: string
    }
  ) { }

}

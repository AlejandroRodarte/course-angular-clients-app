import * as AuthActions from './auth.actions';
import { User } from './../../shared/models/user';

export interface AuthReducerState {
  accessToken: string;
  refreshToken: string;
  expirationDate: number;
  refreshTokenExpirationDate: number;
  user: User;
  loading: boolean;
}

const initialState: AuthReducerState = {
  accessToken: null,
  refreshToken: null,
  expirationDate: 0,
  refreshTokenExpirationDate: 0,
  user: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {

    case AuthActions.AUTO_LOGIN:
    case AuthActions.AUTHENTICATE_START:
      return {
        ...state,
        loading: false
      };

    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expirationDate: new Date().getTime() + (action.payload.expiresIn * 1000),
        refreshTokenExpirationDate: new Date().getTime() + (action.payload.refreshTokenExpiresIn * 1000),
        user: action.payload.user,
        loading: true
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        expirationDate: 0,
        refreshTokenExpirationDate: 0,
        user: null,
        loading: true
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        expirationDate: 0,
        refreshTokenExpirationDate: 0,
        user: null
      };

    default:
      return state;

  }

}

import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, tap, catchError, withLatestFrom } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { OAuth2ResponseSuccess } from 'src/app/shared/payloads/responses';
import { UserData } from 'src/app/shared/payloads/local-storage';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import selectors from 'src/app/store/selectors';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  @Effect()
  authenticateStart =
    this
      .actions$
      .pipe(

        ofType(AuthActions.AUTHENTICATE_START),

        switchMap(

          (action: AuthActions.AuthenticateStart) => {

            const clientCredentials = btoa(`${environment.clientId}:${environment.clientSecret}`);

            const headers = new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${clientCredentials}`
            });

            const params = new URLSearchParams();

            params.set('grant_type', 'password');
            params.set('username', action.payload.username);
            params.set('password', action.payload.password);

            return this
                    .http
                    .post<OAuth2ResponseSuccess>(`${environment.baseUrl}/oauth/token`, params.toString(), { headers })
                    .pipe(

                      map(
                        (response: OAuth2ResponseSuccess) => new AuthActions.AuthenticateSuccess({
                          accessToken: response.access_token,
                          refreshToken: response.refresh_token,
                          expiresIn: response.expires_in * 1000,
                          refreshTokenExpiresIn: response.refresh_token_expires_in * 1000,
                          user: response.user,
                          redirect: true
                        })
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {
                          swal.fire('Login Failure', 'Bad credentials', 'error');
                          // localStorage.removeItem('userData');
                          this.cookieService.delete('userData', '/', window.location.host);
                          return of(new AuthActions.AuthenticateFail());
                        }
                      )

                    );

          }

        )

      );

  @Effect({
    dispatch: false
  })
  authenticateSuccess =
    this
      .actions$
      .pipe(

        ofType(AuthActions.AUTHENTICATE_SUCCESS),

        tap(
          (action: AuthActions.AuthenticateSuccess) => {

            const userData: UserData = {
              accessToken: action.payload.accessToken,
              refreshToken: action.payload.refreshToken,
              expirationDate: new Date().getTime() + action.payload.expiresIn,
              refreshTokenExpirationDate: new Date().getTime() + action.payload.refreshTokenExpiresIn,
              user: action.payload.user
            };

            // localStorage.setItem('userData', JSON.stringify(userData));

            this.cookieService.set(
              'userData',
              JSON.stringify(userData),
              new Date(userData.refreshTokenExpirationDate),
              '/',
              window.location.host,
              false,
              'Strict'
            );

            if (action.payload.redirect) {
              this.router.navigate(['/clients/page', 0]);
              swal.fire('Login Successful!', `Hello ${userData.user.firstName} ${userData.user.lastName}!`, 'success');
            }

            this.authService.setTimer(action.payload.expiresIn);

          }
        )

      );

  @Effect({
    dispatch: false
  })
  logout =
    this
      .actions$
      .pipe(

        ofType(AuthActions.LOGOUT),

        tap(
          (action: AuthActions.Logout) => {
            // localStorage.removeItem('userData');
            this.cookieService.delete('userData', '/', window.location.host);
            this.authService.clearTimer();
            this.router.navigate(['/auth']);
            swal.fire('Logout', 'You have closed your session', 'success');
          }
        )

      );

  @Effect()
  autoLogin =
    this
      .actions$
      .pipe(

        ofType(AuthActions.AUTO_LOGIN),

        map(

          (action: AuthActions.Logout) => {

            // const cookie = localStorage.getItem('userData');
            const cookie = this.cookieService.get('userData');

            if (!cookie) {
              this.router.navigate(['/auth']);
              return new AuthActions.AuthenticateFail();
            }

            // const userData: UserData = JSON.parse(localStorage.getItem('userData'));
            const userData: UserData = JSON.parse(cookie);

            const accessTokenExpirationTime = userData.expirationDate - new Date().getTime();
            const accessTokenExpired = accessTokenExpirationTime < 0;

            const refreshTokenExpirationTime = userData.refreshTokenExpirationDate - new Date().getTime();
            const refreshTokenExpired = refreshTokenExpirationTime < 0;

            if (accessTokenExpired) {

              if (refreshTokenExpired) {
                this.router.navigate(['/auth']);
                return new AuthActions.AuthenticateFail();
              }

              return new AuthActions.RenovateTokenStart({
                fromService: false,
                refreshToken: userData.refreshToken
              });

            }

            return new AuthActions.AuthenticateSuccess({
              accessToken: userData.accessToken,
              refreshToken: userData.refreshToken,
              expiresIn: accessTokenExpirationTime,
              refreshTokenExpiresIn: refreshTokenExpirationTime,
              user: userData.user,
              redirect: false
            });

          }

        )

      );

  @Effect()
  renovateTokenStart =
    this
      .actions$
      .pipe(

        ofType(AuthActions.RENOVATE_TOKEN_START),

        withLatestFrom(this.store.select(selectors.getRefreshToken)),

        switchMap(

          ([action, refreshToken]: [AuthActions.RenovateTokenStart, string]) => {

            const clientCredentials = btoa(`${environment.clientId}:${environment.clientSecret}`);

            const headers = new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${clientCredentials}`
            });

            const params = new URLSearchParams();

            params.set('grant_type', 'refresh_token');

            if (action.payload.fromService) {
              params.set('refresh_token', refreshToken);
            } else {
              params.set('refresh_token', action.payload.refreshToken);
            }

            return this
                    .http
                    .post<OAuth2ResponseSuccess>(`${environment.baseUrl}/oauth/token`, params.toString(), { headers })
                    .pipe(

                      map(
                        (response: OAuth2ResponseSuccess) => new AuthActions.AuthenticateSuccess({
                          accessToken: response.access_token,
                          refreshToken: response.refresh_token,
                          expiresIn: response.expires_in * 1000,
                          refreshTokenExpiresIn: response.refresh_token_expires_in * 1000,
                          user: response.user,
                          redirect: false
                        })
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {
                          swal.fire('Login Failure', 'Bad credentials', 'error');
                          // localStorage.removeItem('userData');
                          this.cookieService.delete('userData', '/', window.location.host);
                          return of(new AuthActions.AuthenticateFail());
                        }
                      )

                    );

          }

        )

      );

}

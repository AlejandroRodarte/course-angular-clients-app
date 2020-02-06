import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import selectors from 'src/app/store/selectors';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this
            .store
            .select(selectors.getAccessToken)
            .pipe(

              take(1),

              exhaustMap(

                (token: string) => {

                  if (!token || (req.body && typeof req.body === 'string' && req.body.includes('grant_type=refresh_token'))) {
                    return next.handle(req);
                  }

                  const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
                  });

                  return next.handle(modifiedReq);

                }

              )

            );

  }

}

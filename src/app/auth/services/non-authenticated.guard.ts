import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import { map, take, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticatedGuardService implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this
            .store
            .select((appState: fromApp.AppState) => appState.auth)
            .pipe(

              skipWhile((authState: fromAuth.AuthReducerState) => !authState.loading),

              take(1),

              map(

                (authState: fromAuth.AuthReducerState) => {

                  if (authState.user) {
                    return this.router.createUrlTree(['/clients/page', 0]);
                  } else {
                    return true;
                  }

                }

              )

            );

  }

}

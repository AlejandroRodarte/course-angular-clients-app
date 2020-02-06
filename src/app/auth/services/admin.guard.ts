import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, take, skipWhile } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import * as fromAuth from '../store/auth.reducer';
import { Role } from './../../shared/models/role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

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

                  if (authState.user && authState.user.roles.map((role: Role) => role.name).includes('ROLE_ADMIN')) {
                    return true;
                  } else {
                    return this.router.createUrlTree(['/auth']);
                  }

                }

              )

            );

  }

}

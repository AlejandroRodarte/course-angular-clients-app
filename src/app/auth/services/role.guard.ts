import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, take, skipWhile } from 'rxjs/operators';
import * as fromAuth from '../store/auth.reducer';
import { Role } from '../../shared/models/role';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

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

                  if (authState.user && authState.user.roles.map((role: Role) => role.name).includes(route.data.role)) {
                    return true;
                  } else {
                    swal.fire('Unauthorized', 'You can not access this resource', 'error');
                    return this.router.createUrlTree(['/auth']);
                  }

                }

              )

            );

  }

}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as RegionActions from '../store/regions.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap, map } from 'rxjs/operators';
import { Region } from 'src/app/shared/models/region';
import selectors from 'src/app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class RegionsResolverService implements Resolve<Region[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Region[] | Observable<Region[]> | Promise<Region[]> {

    return this
            .store
            .select(selectors.getRegions)
            .pipe(

              take(1),

              switchMap(

                (regions: Region[]) => {

                  if (regions.length === 0) {
                    this.store.dispatch(new RegionActions.GetRegionsStart());
                    return this.waitForSuccess();
                  } else {
                    return of(regions);
                  }

                }

              )

            );

  }

  waitForSuccess() {

    return this
            .actions$
            .pipe(

              ofType(RegionActions.GET_REGIONS_SUCCESS),

              take(1),

              map(
                (action: RegionActions.GetRegionsSuccess) => action.payload
              )

            );

  }

}

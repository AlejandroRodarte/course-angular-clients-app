import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as RegionActions from './regions.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Region } from 'src/app/shared/models/region';

@Injectable()
export class RegionEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  @Effect()
  fetchRegions =
    this
      .actions$
      .pipe(

        ofType(RegionActions.GET_REGIONS_START),

        switchMap(

          () => {

            return this
                    .http
                    .get<Region[]>(`${environment.baseUrl}/clients/regions`)
                    .pipe(

                      map(
                        (regions: Region[]) => new RegionActions.GetRegionsSuccess(regions)
                      )

                    );

          }

        )

      );

}

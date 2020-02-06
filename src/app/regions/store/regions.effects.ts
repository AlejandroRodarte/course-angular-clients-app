import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as RegionActions from './regions.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Region } from 'src/app/shared/models/region';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { Location } from '@angular/common';

@Injectable()
export class RegionEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
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
                    .get<Region[]>(`${environment.baseUrl}/api/clients/regions`)
                    .pipe(

                      map(
                        (regions: Region[]) => new RegionActions.GetRegionsSuccess(regions)
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {
                          if (errorResponse.status === 401) {
                            this.router.navigate(['/auth']);
                            return of({
                              type: '[Auth] Auth Redirection'
                            });
                          } else if (errorResponse.status === 403) {
                            this.router.navigate(['/clients/page', 0]);
                            swal.fire('Forbidden', 'You are not allowed to perform this operation');
                            return of({
                              type: '[Auth] Auth Redirection'
                            });
                          }
                        }
                      )

                    );

          }

        )

      );

}

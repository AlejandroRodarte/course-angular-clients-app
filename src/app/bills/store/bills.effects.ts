import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as BillActions from './bills.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { BillDto } from 'src/app/shared/models/bill';

@Injectable()
export class BillsEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }

  @Effect()
  fetchBill =
    this
      .actions$
      .pipe(

        ofType(BillActions.GET_BILL_START),

        switchMap(

          (action: BillActions.GetBillStart) => {

            return this
                    .http
                    .get<BillDto>(`${environment.baseUrl}/api/bills/${action.payload}`)
                    .pipe(
                      map(
                        (bill: BillDto) => new BillActions.GetBillSuccess(bill)
                      )
                    );

          }

        )

      );

}

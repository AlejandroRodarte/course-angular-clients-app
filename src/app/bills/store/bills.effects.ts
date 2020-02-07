import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from './bills.actions';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Bill } from 'src/app/shared/models/bill';

@Injectable()
export class BillsEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }

  @Effect()
  fetchBill =
    this
      .actions$
      .pipe(

        ofType(BillActions.GET_BILL_START),

        switchMap(

          (action: BillActions.GetBillStart) => {

            console.log(action.payload);

            return this
                    .http
                    .get<Bill>(`${environment.baseUrl}/api/bills/${action.payload}`)
                    .pipe(
                      map(
                        (bill: Bill) => new BillActions.GetBillSuccess(bill)
                      )
                    );

          }

        )

      );

}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, switchMap, map, tap } from 'rxjs/operators';
import selectors from 'src/app/store/selectors';
import { Bill } from 'src/app/shared/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillResolverService implements Resolve<Bill> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Bill | Observable<Bill> | Promise<Bill> {

    return this
            .store
            .select(selectors.getSelectedBill)
            .pipe(

              take(1),

              switchMap(

                (selectedBill: Bill) => {

                  if (!selectedBill) {

                    this.store.dispatch(new BillActions.GetBillStart(+route.params.id));

                    return this
                            .actions$
                            .pipe(

                              ofType(BillActions.GET_BILL_SUCCESS),

                              take(1),

                              map(
                                (action: BillActions.GetBillSuccess) => action.payload
                              ),

                              tap(

                                (bill: Bill) => {

                                  if (!bill) {
                                    this.router.navigate(['/clients/page', 0]);
                                  }

                                }
                              )

                            );

                  } else {
                    return of(selectedBill);
                  }

                }

              )

            );

  }

}

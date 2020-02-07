import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, switchMap, map, tap } from 'rxjs/operators';
import selectors from 'src/app/store/selectors';
import { BillDto } from 'src/app/shared/models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillResolverService implements Resolve<BillDto> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BillDto | Observable<BillDto> | Promise<BillDto> {

    return this
            .store
            .select(selectors.getSelectedBill)
            .pipe(

              take(1),

              switchMap(

                (selectedBill: BillDto) => {

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

                                (bill: BillDto) => {

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

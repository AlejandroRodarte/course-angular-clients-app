import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import selectors from 'src/app/store/selectors';
import { BillDto } from 'src/app/shared/models/bill';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent implements OnInit, OnDestroy {

  public title = 'Bill';

  public selectedBill: BillDto;

  private selectedBillSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.selectedBillSubscription =
      this
        .store
        .select(selectors.getSelectedBill)
        .pipe(
          tap(
            (selectedBill: BillDto) => this.selectedBill = selectedBill
          )
        )
        .subscribe();

  }

  ngOnDestroy() {
    this.selectedBillSubscription.unsubscribe();
  }

}

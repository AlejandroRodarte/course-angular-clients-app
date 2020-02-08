import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { RawClientDto } from './../../shared/models/client';
import { ClientDto } from 'src/app/shared/models/client';
import selectors from 'src/app/store/selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit, OnDestroy {

  public title = 'New Bill';

  public billForm: FormGroup;

  public selectedClient: ClientDto;

  private clientSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.clientSubscription =
      this
        .store
        .select(selectors.getSelectedClient)
        .pipe(
          tap(
            (selectedClient: ClientDto) => {
              this.selectedClient = selectedClient;
              this.loadForm();
            }
          )
        )
        .subscribe();

  }

  private loadForm(): void {

    this.billForm = new FormGroup({
      description: new FormControl(null),
      comment: new FormControl(null),
      client: new FormControl(this.selectedClient)
    });

  }

  onSubmit(): void {
    console.log(this.billForm.value);
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import * as BillActions from '../../bills/store/bills.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import selectors from 'src/app/store/selectors';
import { tap } from 'rxjs/operators';
import { ClientDto } from 'src/app/shared/models/client';

import swal from 'sweetalert2';
import { RawBillDto } from 'src/app/shared/models/bill';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit, OnDestroy {

  public title = 'Client Details';

  @Input()
  public selectedClient: ClientDto;

  private downloadProgressSubscription: Subscription;
  private rolesSubscription: Subscription;

  public downloadProgress: number;

  public roles: string[];

  private image: File;

  public isTypeCorrect = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.downloadProgressSubscription =
      this
        .store
        .select(selectors.getDownloadProgress)
        .pipe(
          tap(
            (downloadProgress: number) => this.downloadProgress = downloadProgress
          )
        )
        .subscribe();

    this.rolesSubscription =
      this
        .store
        .select(selectors.getRoles)
        .pipe(
          tap(
            (roles: string[]) => this.roles = roles
          )
        )
        .subscribe();

  }

  onImageUpload({ target }: { target: HTMLInputElement }) {

    if (target.files[0].type.indexOf('image') === -1) {

      swal.fire('Invalid file', 'Please upload an image', 'error');
      this.isTypeCorrect = false;

      return;

    }

    this.image = target.files[0];
    this.isTypeCorrect = true;

  }

  onSubmit() {

    if (this.image) {

      this.store.dispatch(new ClientActions.UploadImageStart({
        image: this.image,
        id: this.selectedClient.id
      }));

    } else {
      swal.fire('Invalid upload', 'Please select an image before sending', 'error');
    }

  }

  onClose() {

    this.image = null;
    this.isTypeCorrect = false;

    this.store.dispatch(new ClientActions.ClearClient());

  }

  hasRole(role: string): boolean {

    if (!this.roles) {
      return false;
    }

    return this.roles.includes(role);

  }

  onDeleteBill(bill: RawBillDto): void {

    swal
      .fire('Deleting Bill', `Are you sure you want to delete this bill ${bill.description}?`, 'warning')
      .then(result => {
        if (result.value) {
          this.store.dispatch(new BillActions.DeleteBillStart(bill.id));
        }
      });

  }

  ngOnDestroy() {
    this.downloadProgressSubscription.unsubscribe();
    this.rolesSubscription.unsubscribe();
  }

}

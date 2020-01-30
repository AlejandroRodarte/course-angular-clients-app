import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../shared/models/client';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as ClientActions from './store/clients.actions';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public clients: Client[];

  private clientSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.clientSubscription =
      this
        .store
        .select(state => state.clients.clients)
        .pipe(
          tap(
            (clients: Client[]) => this.clients = clients
          )
        )
        .subscribe();

    this.errorSubscription =
      this
        .store
        .select(state => ({
          primaryErrorMessage: state.clients.primaryErrorMessage,
          secondaryErrorMessage: state.clients.secondaryErrorMessage
        }))
        .pipe(
          tap(

            ({ primaryErrorMessage, secondaryErrorMessage }:
              { primaryErrorMessage: string, secondaryErrorMessage: string }) => {

                if (primaryErrorMessage && secondaryErrorMessage) {

                  swal
                  .fire(primaryErrorMessage, secondaryErrorMessage, 'error')
                  .then(() => this.store.dispatch(new ClientActions.ClearErrorMessages()));

                }

              }

          )
        )
        .subscribe();

  }

  async onDelete(client: Client) {

    const result =
      await swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to delete user ${client.firstName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

    if (result.value) {
      this.store.dispatch(new ClientActions.DeleteClientStart(client.id));
    }

  }

  onCreateClient() {
    this.store.dispatch(new ClientActions.ClearClient());
    this.store.dispatch(new ClientActions.ClearFormErrorMessages());
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}

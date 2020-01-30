import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../shared/models/client';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as ClientActions from './store/clients.actions';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public clients: Client[];

  public clientSubscription: Subscription;

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

  }

  onCreateClient() {
    this.store.dispatch(new ClientActions.ClearClient());
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

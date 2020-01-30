import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolverService implements Resolve<Client[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Client[] | Observable<Client[]> | Promise<Client[]> {

    return this
            .getClients()
            .pipe(

              take(1),

              switchMap(

                (clients: Client[]) => {

                  if (clients.length === 0) {

                    this.store.dispatch(new ClientActions.GetClientsStart());

                    return this
                            .actions$
                            .pipe(

                              ofType(ClientActions.GET_CLIENTS_SUCCESS),

                              take(1),

                              map(
                                (action: ClientActions.GetClientsSuccess) => action.payload
                              )

                            );

                  } else {
                    return of(clients).pipe(take(1));
                  }

                }

              )

            );

  }

  getClients() {

    return this
            .store
            .select(state => state.clients.clients);

  }

}

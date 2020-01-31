import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientResolverService implements Resolve<Client> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Client | Observable<Client> | Promise<Client> {

    return this
            .getClients()
            .pipe(

              take(1),

              switchMap(

                (clients: Client[]) => {

                  if (clients.length === 0) {

                    this.store.dispatch(new ClientActions.GetClientStart(+route.params.id));

                    return this
                            .actions$
                            .pipe(

                              ofType(ClientActions.GET_CLIENT_SUCCESS),

                              take(1),

                              map(
                                (action: ClientActions.GetClientSuccess) => action.payload
                              ),

                              tap(

                                (client: Client) => {

                                  if (!client) {
                                    this.router.navigate(['/clients/page', 0]);
                                  }

                                }
                              )

                            );

                  } else {
                    this.store.dispatch(new ClientActions.SelectClient(+route.params.id));
                    return of(clients.find(client => client.id === +route.params.id)).pipe(take(1));
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

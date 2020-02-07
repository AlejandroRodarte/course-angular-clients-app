import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ClientDto } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take, switchMap, map, tap } from 'rxjs/operators';
import selectors from 'src/app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ClientResolverService implements Resolve<ClientDto> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClientDto | Observable<ClientDto> | Promise<ClientDto> {

    return this
            .store
            .select(selectors.getSelectedClient)
            .pipe(

              take(1),

              switchMap(

                (selectedClient: ClientDto) => {

                  if (!selectedClient) {

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

                                (client: ClientDto) => {

                                  if (!client) {
                                    this.router.navigate(['/clients/page', 0]);
                                  }

                                }
                              )

                            );

                  } else {
                    return of(selectedClient);
                  }

                }

              )

            );

  }

}

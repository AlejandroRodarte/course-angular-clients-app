import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RawClientDto } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolverService implements Resolve<RawClientDto[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RawClientDto[] | Observable<RawClientDto[]> | Promise<RawClientDto[]> {

    return this
            .getClients()
            .pipe(

              take(1),

              switchMap(

                (clients: RawClientDto[]) => {

                  const page = +route.params.page;

                  if (clients.length === 0) {

                    if (isNaN(page)) {
                      this.store.dispatch(new ClientActions.GetClientsStart(0));
                    } else {
                      this.store.dispatch(new ClientActions.GetClientsStart(page));
                    }

                    return this.waitForSuccess();

                  } else {
                    this.store.dispatch(new ClientActions.GetClientsStart(page));
                    return this.waitForSuccess();
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

  waitForSuccess() {

    return this
            .actions$
            .pipe(

              ofType(ClientActions.GET_CLIENTS_SUCCESS),

              take(1),

              map(
                (action: ClientActions.GetClientsSuccess) => action.payload.clients
              )

            );

  }

}

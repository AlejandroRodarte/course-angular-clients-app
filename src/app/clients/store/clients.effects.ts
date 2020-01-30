import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as ClientActions from './clients.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Client } from 'src/app/shared/models/client';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClientEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }

  @Effect()
  fetchClients =
    this
      .actions$
      .pipe(

        ofType(ClientActions.GET_CLIENTS_START),

        switchMap(

          () => {

            return this
                    .http
                    .get<Client[]>(`${environment.baseUrl}/clients`)
                    .pipe(

                      map(
                        (clients: Client[]) => new ClientActions.GetClientsSuccess(clients)
                      )

                    );

          }

        )

      );

  @Effect()
  fetchClient =
    this
      .actions$
      .pipe(

        ofType(ClientActions.GET_CLIENT_START),

        switchMap(

          (action: ClientActions.GetClientStart) => {

            return this
                    .http
                    .get<Client>(`${environment.baseUrl}/clients/${action.payload}`)
                    .pipe(

                      map(
                        (client: Client) => new ClientActions.GetClientSuccess(client)
                      )

                    );

          }

        )

      );

  @Effect()
  createClient =
    this
      .actions$
      .pipe(

        ofType(ClientActions.ADD_CLIENT_START),

        switchMap(

          (action: ClientActions.AddClientStart) => {

            return this
                    .http
                    .post<Client>(`${environment.baseUrl}/clients`, action.payload)
                    .pipe(

                      map(

                        (client: Client) => {
                          client.createdAt = client.createdAt.substring(0, 10);
                          swal.fire('New Client', `The client ${client.firstName} has been successfully saved.`, 'success');
                          return new ClientActions.AddClientSuccess(client);
                        }

                      ),

                      tap(
                        () => this.router.navigate(['/clients'])
                      )

                    );

          }

        )

      );

  @Effect()
  updateClient =
    this
      .actions$
      .pipe(

        ofType(ClientActions.UPDATE_CLIENT_START),

        switchMap(

          (action: ClientActions.UpdateClientStart) => {

            return this
                    .http
                    .put<Client>(`${environment.baseUrl}/clients/${action.payload.id}`, action.payload)
                    .pipe(

                      map(

                        (client: Client) => {
                          swal.fire('New Client', `The client ${client.firstName} has been successfully updated.`, 'success');
                          return new ClientActions.UpdateClientSuccess(client);
                        }

                      ),

                      tap(
                        () => this.router.navigate(['/clients'])
                      )

                    );

          }

        )

      );

  @Effect()
  deleteClient =
    this
    .actions$
    .pipe(

      ofType(ClientActions.DELETE_CLIENT_START),

      switchMap(

        (action: ClientActions.DeleteClientStart) => {

          return this
                  .http
                  .delete<null>(`${environment.baseUrl}/clients/${action.payload}`)
                  .pipe(

                    map(
                      () => new ClientActions.DeleteClientSuccess(action.payload)
                    ),

                    tap(
                      () => swal.fire('Deleted!', 'The client has been deleted', 'success')
                    )

                  );

        }

      )

    );

}

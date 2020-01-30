import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as ClientActions from './clients.actions';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Client } from 'src/app/shared/models/client';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CreateClientResponseSuccess, DeleteClientResponseSuccess } from './../../shared/payloads/responses';

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

                        (clients: Client[]) => {

                          clients.map(client => {

                            client.firstName = client.firstName.toUpperCase();
                            client.createdAt = formatDate(client.createdAt, 'EEEE dd, MMMM yyyy', 'es-MX');

                            return client;

                          });

                          return new ClientActions.GetClientsSuccess(clients);

                        }

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
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {

                          this.router.navigate(['/clients']);

                          return of(new ClientActions.ClientRequestFail({
                            primaryErrorMessage: 'Error fetching the client',
                            secondaryErrorMessage: errorResponse.error.message
                          }));

                        }
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
                    .post<CreateClientResponseSuccess>(`${environment.baseUrl}/clients`, action.payload)
                    .pipe(

                      map(

                        (response: CreateClientResponseSuccess) => {
                          response.client.createdAt = response.client.createdAt.substring(0, 10);
                          swal.fire(response.message, `The client ${response.client.firstName} has been successfully saved.`, 'success');
                          return new ClientActions.AddClientSuccess(response.client);
                        }

                      ),

                      tap(
                        () => this.router.navigate(['/clients'])
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 400) {
                            return of(new ClientActions.SetFormErrorMessages(errorResponse.error.errors));
                          } else {

                            this.router.navigate(['/clients']);

                            return of(new ClientActions.ClientRequestFail({
                              primaryErrorMessage: 'Error creating the client',
                              secondaryErrorMessage: errorResponse.error.message
                            }));

                          }

                        }

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
                    .put<CreateClientResponseSuccess>(`${environment.baseUrl}/clients/${action.payload.id}`, action.payload)
                    .pipe(

                      map(

                        (response: CreateClientResponseSuccess) => {
                          swal.fire(response.message, `The client ${response.client.firstName} has been successfully updated.`, 'success');
                          return new ClientActions.UpdateClientSuccess(response.client);
                        }

                      ),

                      tap(
                        () => this.router.navigate(['/clients'])
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 400) {
                            return of(new ClientActions.SetFormErrorMessages(errorResponse.error.errors));
                          } else {

                            this.router.navigate(['/clients']);

                            return of(new ClientActions.ClientRequestFail({
                              primaryErrorMessage: 'Error updating the client',
                              secondaryErrorMessage: errorResponse.error.message
                            }));

                          }

                        }
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
                  .delete<DeleteClientResponseSuccess>(`${environment.baseUrl}/clients/${action.payload}`)
                  .pipe(

                    tap(
                      (response: DeleteClientResponseSuccess) => swal.fire('Client Deleted', response.message, 'success')
                    ),

                    map(
                      () => new ClientActions.DeleteClientSuccess(action.payload)
                    ),

                    catchError(
                      (errorResponse: HttpErrorResponse) => of(new ClientActions.ClientRequestFail({
                        primaryErrorMessage: 'Error deleting the client',
                        secondaryErrorMessage: errorResponse.error.message
                      }))
                    )

                  );

        }

      )

    );

}

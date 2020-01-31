import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as ClientActions from './clients.actions';
import selectors, { PageRedirectionParams } from '../../store/selectors';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError, withLatestFrom } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Client } from 'src/app/shared/models/client';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CreateClientResponseSuccess, DeleteClientResponseSuccess, Page } from './../../shared/payloads/responses';
import { Store } from '@ngrx/store';
import { Location, formatDate } from '@angular/common';

@Injectable()
export class ClientEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private location: Location
  ) { }

  @Effect()
  fetchClients =
    this
      .actions$
      .pipe(

        ofType(ClientActions.GET_CLIENTS_START),

        switchMap(

          (action: ClientActions.GetClientsStart) => {

            return this
                    .http
                    .get<Page<Client>>(`${environment.baseUrl}/clients/page/${action.payload}`)
                    .pipe(

                      map(

                        (page: Page<Client>) => {

                          page.content.map(client => {

                            client.firstName = client.firstName.toUpperCase();
                            // client.createdAt = formatDate(client.createdAt, 'EEEE dd, MMMM yyyy', 'es-MX', 'America/Chihuahua');

                            return client;

                          });

                          return new ClientActions.GetClientsSuccess({

                            clients: page.content,

                            paginationParams: {
                              first: page.first,
                              last: page.last,
                              empty: page.empty,
                              totalPages: page.totalPages,
                              totalElements: page.totalElements,
                              size: page.size,
                              number: page.number,
                              numberOfElements: page.numberOfElements
                            }

                          });

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

                          this.router.navigate(['/clients/page', 0]);

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

        withLatestFrom(this.store.select(selectors.pageRedirection)),

        switchMap(

          ([action, pageRedirection]: [ClientActions.AddClientStart, PageRedirectionParams]) => {

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
                        () => pageRedirection.wouldPageChangeOnAdd ? this.router.navigate(['/clients/page', pageRedirection.totalPages])
                        : this.router.navigate(['/clients/page', pageRedirection.totalPages - 1])
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 400) {
                            return of(new ClientActions.SetFormErrorMessages(errorResponse.error.errors));
                          } else {

                            this.location.back();

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
                        () => this.location.back()
                      ),

                      catchError(
                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 400) {
                            return of(new ClientActions.SetFormErrorMessages(errorResponse.error.errors));
                          } else {

                            this.location.back();

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

      withLatestFrom(this.store.select(selectors.pageRedirection)),

      switchMap(

        ([action, pageRedirection]: [ClientActions.DeleteClientStart, PageRedirectionParams]) => {

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

                    tap(
                      () => pageRedirection.wouldPageChangeOnDelete && !pageRedirection.first ?
                      this.router.navigate(['/clients/page', pageRedirection.number - 1]) : ''
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

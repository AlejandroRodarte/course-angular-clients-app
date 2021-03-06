import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import * as ClientActions from './clients.actions';
import selectors, { PageRedirectionParams } from '../../store/selectors';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError, withLatestFrom } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { RawClientDto, ClientDto } from 'src/app/shared/models/client';
import { CreateResponseSuccess, DeleteResponseSuccess, Page } from './../../shared/payloads/responses';

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
                    .get<Page<RawClientDto>>(`${environment.baseUrl}/api/clients/page/${action.payload}`)
                    .pipe(

                      map(

                        (page: Page<RawClientDto>) => {

                          page.content.map(client => {
                            client.firstName = client.firstName.toUpperCase();
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
                    .get<ClientDto>(`${environment.baseUrl}/api/clients/${action.payload.id}`, {
                      params: new HttpParams().append('eager', action.payload.eager.toString())
                    })
                    .pipe(

                      map(
                        (client: ClientDto) => new ClientActions.GetClientSuccess(client)
                      ),

                      catchError(

                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 401) {

                            this.router.navigate(['/auth']);

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          } else if (errorResponse.status === 403) {

                            this.router.navigate(['/clients/page', 0]);
                            swal.fire('Forbidden', 'You are not allowed to access this resource');

                          }

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
                    .post<CreateResponseSuccess<RawClientDto>>(`${environment.baseUrl}/api/clients`, action.payload)
                    .pipe(

                      map(

                        (response: CreateResponseSuccess<RawClientDto>) => {

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
                          } else if (errorResponse.status === 401) {

                            this.router.navigate(['/auth']);

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          } else if (errorResponse.status === 403) {

                            this.location.back();
                            swal.fire('Forbidden', 'You are not allowed to perform this operation');

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          }

                          this.location.back();

                          return of(new ClientActions.ClientRequestFail({
                            primaryErrorMessage: 'Error creating the client',
                            secondaryErrorMessage: errorResponse.error.message
                          }));

                        }

                      )

                    );

          }

        )

      );

  @Effect()
  uploadImage =
    this
      .actions$
      .pipe(

        ofType(ClientActions.UPLOAD_IMAGE_START),

        switchMap(

          (action: ClientActions.UploadImageStart) => {

            const formData = new FormData();

            formData.append('image', action.payload.image);
            formData.append('id', action.payload.id.toString());

            const customPostRequest =
              new HttpRequest(
                'POST',
                `${environment.baseUrl}/api/clients/upload`,
                formData,
                { reportProgress: true }
              );

            return this
                    .http
                    .request<CreateResponseSuccess<RawClientDto>>(customPostRequest)
                    .pipe(

                      map(

                        (event: HttpEvent<CreateResponseSuccess<RawClientDto>>) => {

                          if (event.type === HttpEventType.UploadProgress) {
                            return new ClientActions.SetUploadProgress(Math.round((event.loaded / event.total) * 100));
                          } else if (event.type === HttpEventType.Response) {
                            swal.fire(`The client ${event.body.client.firstName} has updated its image.`, event.body.message, 'success');
                            return new ClientActions.UploadImageSuccess(event.body.client);
                          }

                          return {
                            type: '[Clients] Filler Upload Image Action'
                          };

                        }

                      ),

                      catchError(

                        (errorResponse: HttpErrorResponse) => {

                          if (errorResponse.status === 401) {

                            this.router.navigate(['/auth']);

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          } else if (errorResponse.status === 403) {

                            swal.fire('Forbidden', 'You are not allowed to perform this operation');

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          }

                          this.location.back();

                          return of(new ClientActions.ClientRequestFail({
                            primaryErrorMessage: errorResponse.error.message,
                            secondaryErrorMessage: errorResponse.error.error
                          }));


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
                    .put<CreateResponseSuccess<RawClientDto>>(`${environment.baseUrl}/api/clients/${action.payload.id}`, action.payload)
                    .pipe(

                      map(

                        (response: CreateResponseSuccess<RawClientDto>) => {
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
                          } else if (errorResponse.status === 401) {

                            this.router.navigate(['/auth']);

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          } else if (errorResponse.status === 403) {

                            swal.fire('Forbidden', 'You are not allowed to perform this operation');

                            return of({
                              type: '[Auth] Auth Redirection'
                            });

                          }

                          this.location.back();

                          return of(new ClientActions.ClientRequestFail({
                            primaryErrorMessage: 'Error updating the client',
                            secondaryErrorMessage: errorResponse.error.message
                          }));

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
                  .delete<DeleteResponseSuccess>(`${environment.baseUrl}/api/clients/${action.payload}`)
                  .pipe(

                    tap(
                      (response: DeleteResponseSuccess) => swal.fire('Client Deleted', response.message, 'success')
                    ),

                    map(
                      () => new ClientActions.DeleteClientSuccess(action.payload)
                    ),

                    tap(
                      () => pageRedirection.wouldPageChangeOnDelete && !pageRedirection.first ?
                      this.router.navigate(['/clients/page', pageRedirection.number - 1]) : ''
                    ),

                    catchError(

                      (errorResponse: HttpErrorResponse) => {

                        if (errorResponse.status === 401) {

                          this.router.navigate(['/auth']);

                          return of({
                            type: '[Auth] Auth Redirection'
                          });

                        } else if (errorResponse.status === 403) {

                          swal.fire('Forbidden', 'You are not allowed to perform this operation');

                          return of({
                            type: '[Auth] Auth Redirection'
                          });

                        }

                        return of(new ClientActions.ClientRequestFail({
                          primaryErrorMessage: 'Error deleting the client',
                          secondaryErrorMessage: errorResponse.error.message
                        }));

                      }
                    )

                  );

        }

      )

    );

}

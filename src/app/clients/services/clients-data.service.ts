import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { environment } from './../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsDataService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {

    return this
            .http
            .get<Client[]>(`${environment.baseUrl}/clients`);

  }

  getClient(id: number): Observable<Client> {

    return this
            .http
            .get<Client>(`${environment.baseUrl}/clients/${id}`);

  }

  createClient(client: Client): Observable<Client> {

    return this
            .http.
            post<Client>(
              `${environment.baseUrl}/clients`,
              client,
              { headers: this.httpHeaders }
            )
            .pipe(
              tap(
                (newClient: Client) => {
                  newClient.createdAt = newClient.createdAt.substring(0, 10);
                }
              )
            );

  }

  updateClient(client: Client): Observable<Client> {

    return this
            .http
            .put<Client>(
              `${environment.baseUrl}/clients/${client.id}`,
              client,
              { headers: this.httpHeaders }
            );

  }

}

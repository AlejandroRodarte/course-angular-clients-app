import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawClientDto } from 'src/app/shared/models/client';
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

  getClients(): Observable<RawClientDto[]> {

    return this
            .http
            .get<RawClientDto[]>(`${environment.baseUrl}/api/clients`);

  }

  getClient(id: number): Observable<RawClientDto> {

    return this
            .http
            .get<RawClientDto>(`${environment.baseUrl}/api/clients/${id}`);

  }

  createClient(client: RawClientDto): Observable<RawClientDto> {

    return this
            .http.
            post<RawClientDto>(
              `${environment.baseUrl}/api/clients`,
              client,
              { headers: this.httpHeaders }
            )
            .pipe(
              tap(
                (newClient: RawClientDto) => {
                  newClient.createdAt = newClient.createdAt.substring(0, 10);
                }
              )
            );

  }

  updateClient(client: RawClientDto): Observable<RawClientDto> {

    return this
            .http
            .put<RawClientDto>(
              `${environment.baseUrl}/api/clients/${client.id}`,
              client,
              { headers: this.httpHeaders }
            );

  }

}

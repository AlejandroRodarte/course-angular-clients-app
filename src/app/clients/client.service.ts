import { Injectable } from '@angular/core';
import { Client } from './client.js';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private endpoint = 'http://localhost:8080/api/clients';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public clients: Client[] = [];

  public clientsUpdated: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {

  }

  seed(): void {
    this.http.get<Client[]>(this.endpoint).subscribe(clients => {
      this.clients = clients;
      this.clientsUpdated.next();
    });
  }

  getClients(): Client[] {
    return this.clients.slice();
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.endpoint}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.endpoint, client, { headers: this.httpHeaders });
  }

}

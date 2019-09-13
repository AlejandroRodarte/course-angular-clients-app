import { Injectable } from '@angular/core';
import { Client } from './client.js';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private endpoint = 'http://localhost:8080/api/clients';

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

}

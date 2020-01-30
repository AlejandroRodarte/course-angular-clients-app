import { Injectable } from '@angular/core';
import { Client } from '../../shared/models/client.js';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientsDataService } from './clients-data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [];

  private selectedClient: Client;

  public clientsUpdated: Subject<void> = new Subject<void>();

  constructor(
    private clientsDataService: ClientsDataService
  ) { }

  getClients(): Client[] {
    return this.clients.slice();
  }

  getClient(id: number): Client {

    const foundClient = this.clients.find((client: Client) => {
      return client.id === id;
    });

    this.selectedClient = foundClient;

    return foundClient;

  }

  getSelectedClient(): Client {
    return this.selectedClient;
  }

  fetchClients(): Observable<Client[]> {

    return this
            .clientsDataService
            .getClients()
            .pipe(
              tap(
                (clients: Client[]) => {
                  this.clients = clients;
                }
              )
            );

  }

  fetchClient(id: number): Observable<Client> {

    return this
            .clientsDataService
            .getClient(id)
            .pipe(
              tap(
                (client: Client) => {
                  this.selectedClient = client;
                }
              )
            );

  }

  createClient(newClient: Client): Observable<Client> {

    return this
            .clientsDataService
            .createClient(newClient)
            .pipe(
              tap(
                (client: Client) => {
                  this.clients.push(client);
                  this.clientsUpdated.next();
                }
              )
            );

  }

  updateClient(updatedClient: Client): Observable<Client> {

    return this
            .clientsDataService
            .updateClient(updatedClient)
            .pipe(
              tap(
                (newClient: Client) => {

                  const clientIndex = this.clients.findIndex(client => client.id === updatedClient.id);
                  this.clients[clientIndex] = newClient;

                  this.clientsUpdated.next();

                }
              )
            );

  }

}

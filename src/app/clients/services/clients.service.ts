import { Injectable } from '@angular/core';
import { RawClientDto } from '../../shared/models/client.js';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientsDataService } from './clients-data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: RawClientDto[] = [];

  private selectedClient: RawClientDto;

  public clientsUpdated: Subject<void> = new Subject<void>();

  constructor(
    private clientsDataService: ClientsDataService
  ) { }

  getClients(): RawClientDto[] {
    return this.clients.slice();
  }

  getClient(id: number): RawClientDto {

    const foundClient = this.clients.find((client: RawClientDto) => {
      return client.id === id;
    });

    this.selectedClient = foundClient;

    return foundClient;

  }

  getSelectedClient(): RawClientDto {
    return this.selectedClient;
  }

  fetchClients(): Observable<RawClientDto[]> {

    return this
            .clientsDataService
            .getClients()
            .pipe(
              tap(
                (clients: RawClientDto[]) => {
                  this.clients = clients;
                }
              )
            );

  }

  fetchClient(id: number): Observable<RawClientDto> {

    return this
            .clientsDataService
            .getClient(id)
            .pipe(
              tap(
                (client: RawClientDto) => {
                  this.selectedClient = client;
                }
              )
            );

  }

  createClient(newClient: RawClientDto): Observable<RawClientDto> {

    return this
            .clientsDataService
            .createClient(newClient)
            .pipe(
              tap(
                (client: RawClientDto) => {
                  this.clients.push(client);
                  this.clientsUpdated.next();
                }
              )
            );

  }

  updateClient(updatedClient: RawClientDto): Observable<RawClientDto> {

    return this
            .clientsDataService
            .updateClient(updatedClient)
            .pipe(
              tap(
                (newClient: RawClientDto) => {

                  const clientIndex = this.clients.findIndex(client => client.id === updatedClient.id);
                  this.clients[clientIndex] = newClient;

                  this.clientsUpdated.next();

                }
              )
            );

  }

}

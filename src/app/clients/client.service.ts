import { Injectable } from '@angular/core';
import { CLIENTS } from './clients.json';
import { Client } from './client.js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public clientsUpdated: Subject<Client[]> = new Subject<Client[]>();

  constructor() {

  }

  getClients(): Client[] {
    return CLIENTS;
  }

}

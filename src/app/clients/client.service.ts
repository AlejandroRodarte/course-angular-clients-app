import { Injectable } from '@angular/core';
import { CLIENTS } from './clients.json';
import { Client } from './client.js';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() {

  }

  getClients(): Client[] {
    return CLIENTS;
  }

}

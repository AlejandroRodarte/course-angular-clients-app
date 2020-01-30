import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/shared/models/client';
import { Observable } from 'rxjs';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolverService implements Resolve<Client> {

  constructor(
    private clientsService: ClientsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Client | Observable<Client> | Promise<Client> {

    const clients = this.clientsService.getClients();

    if (clients.length === 0) {
      return this.clientsService.fetchClient(+route.params.id);
    } else {
      return this.clientsService.getClient(+route.params.id);
    }

  }

}

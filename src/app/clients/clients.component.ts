import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../shared/models/client';
import { ClientsService } from './services/clients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public clients: Client[];

  public clientSubscription: Subscription;

  constructor(
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.clients = this.clientsService.getClients();
    this.clientSubscription = this.clientsService.clientsUpdated.subscribe(() => this.clients = this.clientsService.getClients());
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

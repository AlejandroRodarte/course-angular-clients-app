import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  public clients: Client[];

  public clientSubscription: Subscription;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.seed();
    this.clientSubscription = this.clientService.clientsUpdated.subscribe(() => this.clients = this.clientService.getClients());
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

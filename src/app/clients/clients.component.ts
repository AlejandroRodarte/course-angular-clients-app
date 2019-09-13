import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clients.json';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[];

  constructor() { }

  ngOnInit() {
    this.clients = CLIENTS;
  }

}

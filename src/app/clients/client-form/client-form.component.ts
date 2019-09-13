import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from './../client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  private client: Client;
  public title = 'Create Client';

  constructor() { }

  ngOnInit() {
  }

  onSubmit(clientForm: NgForm) {
    this.client = clientForm.value;
  }

}

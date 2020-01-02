import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from './../client';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  public client: Client = new Client();
  public title = 'Create Client';

  public editMode = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient(): void {

    this.route.params.subscribe((params: Params) => {

      const id = params.id;

      if (id) {

        this.editMode = true;

        this.clientService.getClient(id).subscribe(client => {
          this.client = client;
        });

      } else {
        this.editMode = false;
      }

    });

  }

  onSubmit(clientForm: NgForm) {

    this.client.firstName = clientForm.value.firstName;
    this.client.lastName = clientForm.value.lastName;
    this.client.email = clientForm.value.email;

    if (!this.editMode) {
      this.clientService.createClient(this.client).subscribe(client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client', `The client ${client.firstName} has been successfully saved.`, 'success');
      });
    } else {
      this.clientService.updateClient(this.client).subscribe(client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client', `The client ${client.firstName} has been successfully updated.`, 'success');
      });
    }

  }

}

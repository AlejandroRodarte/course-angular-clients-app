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
        this.clientService.getClient(id).subscribe(client => {
          this.client = client;
        });
      }

    });

  }

  onSubmit(clientForm: NgForm) {

    this.client = clientForm.value;

    this.clientService.createClient(this.client).subscribe(client => {
      this.router.navigate(['/clients']);
      swal.fire('New Client', `The client ${client.firstName} has been successfully saved.`, 'success');
    });

  }

}

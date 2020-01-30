import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../shared/models/client';
import { ClientsService } from '../services/clients.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  public clientForm: FormGroup;

  public client: Client;

  public title = 'Create Client';

  public editMode = false;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient(): void {

    this.route.params.subscribe((params: Params) => {

      const id = +params.id;

      if (id) {
        this.editMode = true;
        this.client = this.clientsService.getSelectedClient();
      } else {
        this.editMode = false;
      }

      this.loadForm();

    });

  }

  onSubmit() {

    if (!this.editMode) {

      this.clientsService.createClient(this.clientForm.value).subscribe(client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client', `The client ${client.firstName} has been successfully saved.`, 'success');
      });

    } else {

      this.clientsService.updateClient({ id: this.client.id, ...this.clientForm.value }).subscribe(client => {
        this.router.navigate(['/clients']);
        swal.fire('New Client', `The client ${client.firstName} has been successfully updated.`, 'success');
      });

    }

  }

  private loadForm(): void {

    let firstName: string | null = null;
    let lastName: string | null = null;
    let email: string | null = null;

    if (this.editMode) {
      firstName = this.client.firstName;
      lastName = this.client.lastName;
      email = this.client.email;
    }

    this.clientForm = new FormGroup({
      firstName: new FormControl(firstName, [Validators.required]),
      lastName: new FormControl(lastName, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email])
    });

  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../shared/models/client';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit, OnDestroy {

  public clientForm: FormGroup;

  public client: Client;

  public title = 'Create Client';

  public errors: string[] = [];

  public editMode = false;

  private clientSubscription: Subscription;

  private errorsSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.clientSubscription =
      this
        .store
        .select(state => ({
          client: state.clients.selectedClient,
          editMode: state.clients.editMode
        }))
        .pipe(
          tap(
            ({ client, editMode }: { client: Client, editMode: boolean }) => {
              this.client = client;
              this.editMode = editMode;
              this.loadForm();
            }
          )
        )
        .subscribe();

    this.errorsSubscription =
      this
        .store
        .select(state => state.clients.formErrors)
        .pipe(
          tap(
            (errors: string[]) => {
              this.errors = errors;
            }
          )
        )
        .subscribe();

  }

  onSubmit() {

    if (!this.editMode) {
      this.store.dispatch(new ClientActions.AddClientStart(this.clientForm.value));
    } else {
      this.store.dispatch(new ClientActions.UpdateClientStart({ id: this.client.id, ...this.clientForm.value }));
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

    // this.clientForm = new FormGroup({
    //   firstName: new FormControl(firstName, [Validators.required, Validators.minLength(4)]),
    //   lastName: new FormControl(lastName, [Validators.required]),
    //   email: new FormControl(email, [Validators.required, Validators.email])
    // });

    this.clientForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      email: new FormControl(email)
    });

  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

}

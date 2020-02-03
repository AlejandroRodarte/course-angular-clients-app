import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../shared/models/client';
import * as fromApp from '../../store/app.reducer';
import * as ClientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import selectors from 'src/app/store/selectors';
import { Region } from './../../shared/models/region';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit, OnDestroy {

  public clientForm: FormGroup;

  public client: Client;

  public regions: Region[];

  public title = 'Create Client';

  public errors: string[] = [];

  public editMode = false;

  private clientSubscription: Subscription;

  private errorsSubscription: Subscription;

  private regionsSubscription: Subscription;

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

    this.regionsSubscription =
      this
        .store
        .select(selectors.getRegions)
        .pipe(
          tap(
            (regions: Region[]) => this.regions = regions
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

  onCompareRegion(currentRegion: Region, clientRegion: Region): boolean {

    if (!currentRegion && !clientRegion) {
      return true;
    }

    return !clientRegion || !currentRegion ? false : clientRegion.id === currentRegion.id;

  }

  private loadForm(): void {

    let firstName: string | null = null;
    let lastName: string | null = null;
    let email: string | null = null;
    let createdAt: string | null = null;
    let region: Region | null = null;

    if (this.editMode) {
      firstName = this.client.firstName;
      lastName = this.client.lastName;
      email = this.client.email;
      createdAt = this.client.createdAt;
      region = this.client.region;
    }

    this.clientForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      email: new FormControl(email),
      createdAt: new FormControl(createdAt),
      region: new FormControl(region)
    });

  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
    this.regionsSubscription.unsubscribe();
  }

}

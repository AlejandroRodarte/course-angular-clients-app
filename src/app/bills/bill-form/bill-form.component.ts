import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { RawClientDto } from './../../shared/models/client';
import { ClientDto } from 'src/app/shared/models/client';
import selectors from 'src/app/store/selectors';
import { tap, startWith, map, flatMap } from 'rxjs/operators';
import { ProductDto } from 'src/app/shared/models/product';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit, OnDestroy {

  public title = 'New Bill';

  public billForm: FormGroup;

  public selectedClient: ClientDto;

  public autocompleteControl = new FormControl();

  public products: string[] = ['Chair', 'Tablet', 'Sony', 'TV'];

  public filteredProducts: Observable<ProductDto[]>;

  private clientSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.clientSubscription =
      this
        .store
        .select(selectors.getSelectedClient)
        .pipe(
          tap(
            (selectedClient: ClientDto) => {
              this.selectedClient = selectedClient;
              this.loadForm();
            }
          )
        )
        .subscribe();

    this.filteredProducts =
      this
        .autocompleteControl
        .valueChanges
        .pipe(
          map(value => typeof value === 'string' ? value : value.name),
          tap((value: string) => value && this.store.dispatch(new BillActions.GetProductsStart(value))),
          flatMap((value: string) => value ? this.getProducts() : [])
        );

  }

  private loadForm(): void {

    this.billForm = new FormGroup({
      description: new FormControl(null),
      comment: new FormControl(null),
      client: new FormControl(this.selectedClient)
    });

  }

  onSubmit(): void {
    delete this.billForm.value.client.bills;
    console.log(this.billForm.value);
  }

  displayName(product?: ProductDto): string | undefined {
    return product ? product.name : undefined;
  }

  private getProducts(): Observable<ProductDto[]> {
    return this.store.select(selectors.getProducts);
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

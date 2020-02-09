import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as BillActions from '../store/bills.actions';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, FormArray, Form, AbstractControl, Validators } from '@angular/forms';
import { RawClientDto } from './../../shared/models/client';
import { ClientDto } from 'src/app/shared/models/client';
import selectors from 'src/app/store/selectors';
import { tap, startWith, map, flatMap } from 'rxjs/operators';
import { ProductDto } from 'src/app/shared/models/product';
import { MatAutocompleteSelectedEvent } from '@angular/material';

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
      client: new FormControl(this.selectedClient),
      billItems: new FormArray([])
    });

  }

  onSubmit(): void {
    if (this.billForm.value.client.hasOwnProperty('bills')) {
      delete this.billForm.value.client.bills;
    }
  }

  displayName(product?: ProductDto): string | undefined {
    return product ? product.name : undefined;
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {

    const product: ProductDto = event.option.value;

    const billItemControl =
      this.getControls('billItems').find((control: FormGroup) => control.get(['product']).value.id === product.id);

    if (billItemControl) {
      (billItemControl as FormGroup).get('quantity').setValue((billItemControl as FormGroup).get('quantity').value + 1);
    } else {
      this.getFormArray('billItems').push(new FormGroup({
        quantity: new FormControl(1),
        product: new FormControl(product)
      }));
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  private getProducts(): Observable<ProductDto[]> {
    return this.store.select(selectors.getProducts);
  }

  private getFormArray(path: (string | number)[] | string): FormArray {
    return this.billForm.get(path) as FormArray;
  }

  getControls(path: (string | number)[] | string): AbstractControl[] {
    return this.getFormArray(path).controls;
  }

  onDeleteBillItem(i: number): void {
    this.getFormArray('billItems').removeAt(i);
  }

  get total(): number {

    let total = 0;

    this
      .getControls('billItems')
      .map(control => ({
        quantity: control.get('quantity').value as number,
        price: control.get('product').value.price as number
      }))
      .forEach(({ quantity, price }) => total += quantity * price);

    return total;

  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

}

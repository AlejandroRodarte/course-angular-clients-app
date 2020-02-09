import { NgModule } from '@angular/core';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { CommonModule } from '@angular/common';
import { BillsRoutingModule } from './bills-routing.module';
import { BillFormComponent } from './bill-form/bill-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    BillDetailComponent,
    BillFormComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ]
})
export class BillsModule { }

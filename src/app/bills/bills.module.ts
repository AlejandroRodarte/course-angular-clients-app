import { NgModule } from '@angular/core';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { CommonModule } from '@angular/common';
import { BillsRoutingModule } from './bills-routing.module';
import { BillFormComponent } from './bill-form/bill-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BillDetailComponent,
    BillFormComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BillsModule { }

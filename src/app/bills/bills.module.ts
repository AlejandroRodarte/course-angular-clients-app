import { NgModule } from '@angular/core';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { CommonModule } from '@angular/common';
import { BillsRoutingModule } from './bills-routing.module';

@NgModule({
  declarations: [
    BillDetailComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillResolverService } from './services/bill-resolver.service';
import { BillFormComponent } from './bill-form/bill-form.component';
import { ClientResolverService } from '../clients/services/client-resolver.service';

const billsRoutes: Routes = [
  {
    path: '',
    redirectTo: '0'
  },
  {
    path: ':id',
    component: BillDetailComponent,
    resolve: [
      BillResolverService
    ]
  },
  {
    path: 'form/:id',
    component: BillFormComponent,
    resolve: [
      ClientResolverService
    ],
    data: {
      eager: false
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(billsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BillsRoutingModule { }

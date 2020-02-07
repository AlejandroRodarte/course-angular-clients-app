import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients/page/0',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsResolverService } from './services/clients-resolver.service';
import { ClientResolverService } from './services/client-resolver.service';

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    resolve: [
      ClientsResolverService
    ]
  },
  {
    path: 'form',
    component: ClientFormComponent
  },
  {
    path: 'form/:id',
    component: ClientFormComponent,
    resolve: [
      ClientResolverService
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(clientRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientsRoutingModule { }

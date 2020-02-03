import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsResolverService } from './services/clients-resolver.service';
import { ClientResolverService } from './services/client-resolver.service';
import { RegionsResolverService } from '../regions/services/regions-resolver.service';

const clientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'page/0'
  },
  {
    path: 'page/:page',
    component: ClientsComponent,
    resolve: [
      ClientsResolverService
    ]
  },
  {
    path: 'form',
    component: ClientFormComponent,
    resolve: [
      RegionsResolverService
    ]
  },
  {
    path: 'form/:id',
    component: ClientFormComponent,
    resolve: [
      ClientResolverService,
      RegionsResolverService
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

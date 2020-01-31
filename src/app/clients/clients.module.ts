import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients-routing.module';

import { ClientsComponent } from './clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { NgModule } from '@angular/core';
import { ClientPaginatorComponent } from './client-paginator/client-paginator.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent,
    ClientPaginatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientsRoutingModule
  ],
  providers: []
})
export class ClientsModule { }

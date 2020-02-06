import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClientEffects } from './clients/store/clients.effects';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegionEffects } from './regions/store/regions.effects';
import { AuthEffects } from './auth/store/auth.effects';
import { CoreModule } from './core.module';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(localeMX, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      ClientEffects,
      RegionEffects,
      AuthEffects
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

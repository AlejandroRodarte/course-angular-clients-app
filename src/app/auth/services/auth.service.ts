import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenRequestTimer: NodeJS.Timer;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setTimer(expirationTime: number): void {

    clearTimeout(this.refreshTokenRequestTimer);
    this.refreshTokenRequestTimer = null;

    if (expirationTime - 2000 <= 0) {
      this.store.dispatch(new AuthActions.RenovateTokenStart({ fromService: true }));
    } else {
      this.refreshTokenRequestTimer =
        setTimeout(() => this.store.dispatch(new AuthActions.RenovateTokenStart({ fromService: true })), expirationTime - 2000);
    }

  }

  clearTimer(): void {
    clearTimeout(this.refreshTokenRequestTimer);
    this.refreshTokenRequestTimer = null;
  }

}

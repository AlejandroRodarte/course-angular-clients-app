import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import selectors from '../store/selectors';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private pageSubscription: Subscription;
  private authSubscription: Subscription;

  public currentPage: number;
  public username: string;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.pageSubscription =
      this
        .store
        .select(selectors.getCurrentPage)
        .pipe(
          tap(
            (currentPage: number) => this.currentPage = currentPage
          )
        )
        .subscribe();

    this.authSubscription =
      this
        .store
        .select(selectors.getUsername)
        .pipe(
          tap(
            (username: string) => this.username = username
          )
        )
        .subscribe();

  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}

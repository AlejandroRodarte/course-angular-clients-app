import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import selectors from '../store/selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private pageSubscription: Subscription;

  public currentPage: number;

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

  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }

}

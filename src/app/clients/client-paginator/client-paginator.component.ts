import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PaginationParams } from 'src/app/shared/payloads/pagination';

@Component({
  selector: 'app-client-paginator',
  templateUrl: './client-paginator.component.html',
  styleUrls: ['./client-paginator.component.css']
})
export class ClientPaginatorComponent implements OnInit, OnDestroy {

  @Input()
  public pageLinks: number;

  public pagesArray: number[] = [];

  private paginationSubscription: Subscription;

  public paginationParams: PaginationParams;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    this.paginationSubscription =
      this
        .store
        .select(state => state.clients.paginationParams)
        .pipe(

          tap(
            (paginationParams: PaginationParams) => {
              this.paginationParams = paginationParams;
              this.counter();
            }
          )

        )
        .subscribe();

  }

  counter() {

    const actualPage = this.paginationParams.number + 1;
    const range = 0.5 * (this.pageLinks + 1);

    const firstPages = (actualPage - range) * this.paginationParams.size <= 0;

    const lastPages =
    ((actualPage + range) * this.paginationParams.size) - this.paginationParams.size >= this.paginationParams.totalElements;

    if (firstPages) {

      this.pagesArray = this.getSequentialArray(
        1,
        this.paginationParams.totalPages > this.pageLinks ? this.pageLinks : this.paginationParams.totalPages
      );

    } else if (lastPages) {

      this.pagesArray = this.getSequentialArray(
        this.paginationParams.totalPages - (this.pageLinks - 1)
        <= 0 ? 1 : this.paginationParams.totalPages - (this.pageLinks - 1),
        this.paginationParams.totalPages
      );

    } else {

      this.pagesArray = this.getSequentialArray(
        actualPage - (0.5 * (this.pageLinks - 1)),
        actualPage + (0.5 * (this.pageLinks - 1))
      );

    }

  }

  private getSequentialArray(min: number, max: number) {

    const array: number[] = [];

    const range = max - min + 1;

    for (let i = 0; i < range; i++) {
      array.push(min + i);
    }

    return array;

  }

  ngOnDestroy() {
    this.paginationSubscription.unsubscribe();
  }

}

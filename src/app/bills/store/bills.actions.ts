import { Action } from '@ngrx/store';
import { BillDto } from 'src/app/shared/models/bill';

export const GET_BILL_START = '[Bills] Get Bill Start';
export const GET_BILL_SUCCESS = '[Bills] Get Bill Success';
export const CLEAR_BILL = '[Bills] Clear Bill';

export const DELETE_BILL_START = '[Bills] Delete Bill Start';

export type BillActions =
GetBillStart |
GetBillSuccess |
ClearBill |
DeleteBillStart;

export class GetBillStart implements Action {

  readonly type = GET_BILL_START;

  constructor(
    public payload: number
  ) { }

}

export class GetBillSuccess implements Action {

  readonly type = GET_BILL_SUCCESS;

  constructor(
    public payload: BillDto
  ) { }

}

export class ClearBill implements Action {
  readonly type = CLEAR_BILL;
}

export class DeleteBillStart implements Action {

  readonly type = DELETE_BILL_START;

  constructor(
    public payload: number
  ) { }

}

import { Action } from '@ngrx/store';
import { BillDto } from 'src/app/shared/models/bill';
import { ProductDto } from 'src/app/shared/models/product';
import { CreateBillRequest } from 'src/app/shared/payloads/requests';

export const GET_BILL_START = '[Bills] Get Bill Start';
export const GET_BILL_SUCCESS = '[Bills] Get Bill Success';
export const CLEAR_BILL = '[Bills] Clear Bill';

export const DELETE_BILL_START = '[Bills] Delete Bill Start';

export const GET_PRODUCTS_START = '[Bills] Get Products Start';
export const GET_PRODUCTS_SUCCESS = '[Bills] Get Products Success';

export const ADD_BILL_START = '[Bills] Add Bill Start';
export const ADD_BILL_SUCCESS = '[Bills] Add Bill Success';

export type BillActions =
GetBillStart |
GetBillSuccess |
ClearBill |
DeleteBillStart |
GetProductsStart |
GetProductsSuccess |
AddBillStart |
AddBillSuccess;

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

export class GetProductsStart implements Action {

  readonly type = GET_PRODUCTS_START;

  constructor(
    public payload: string
  ) { }

}

export class GetProductsSuccess implements Action {

  readonly type = GET_PRODUCTS_SUCCESS;

  constructor(
    public payload: ProductDto[]
  ) { }

}

export class AddBillStart implements Action {

  readonly type = ADD_BILL_START;

  constructor(
    public payload: CreateBillRequest
  ) { }

}

export class AddBillSuccess implements Action {

  readonly type = ADD_BILL_SUCCESS;

  constructor(
    public payload: BillDto
  ) { }

}

import { BillDto } from 'src/app/shared/models/bill';
import * as BillActions from './bills.actions';
import { ProductDto } from 'src/app/shared/models/product';

export interface BillsReducerState {
  selectedBill: BillDto;
  products: ProductDto[];
}

const initialState: BillsReducerState = {
  selectedBill: null,
  products: []
};

export function billsReducer(state = initialState, action: BillActions.BillActions) {

  switch (action.type) {

    case BillActions.GET_BILL_SUCCESS:
      return {
        ...state,
        selectedBill: action.payload
      };

    case BillActions.CLEAR_BILL:
      return {
        ...state,
        selectedBill: null
      };

    case BillActions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;

  }

}

import { BillDto } from 'src/app/shared/models/bill';
import * as BillActions from './bills.actions';

export interface BillsReducerState {
  selectedBill: BillDto;
}

const initialState: BillsReducerState = {
  selectedBill: null
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

    default:
      return state;

  }

}

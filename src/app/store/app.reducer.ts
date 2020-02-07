import * as fromClients from '../clients/store/clients.reducer';
import * as fromRegions from '../regions/store/regions.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromBills from '../bills/store/bills.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  clients: fromClients.ClientsReducerState;
  regions: fromRegions.RegionsReducerState;
  auth: fromAuth.AuthReducerState;
  bills: fromBills.BillsReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  clients: fromClients.clientsReducer,
  regions: fromRegions.regionsReducer,
  auth: fromAuth.authReducer,
  bills: fromBills.billsReducer
};

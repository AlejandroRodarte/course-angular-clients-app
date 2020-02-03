import * as fromClients from '../clients/store/clients.reducer';
import * as fromRegions from '../regions/store/regions.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  clients: fromClients.ClientsReducerState;
  regions: fromRegions.RegionsReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  clients: fromClients.clientsReducer,
  regions: fromRegions.regionsReducer
};

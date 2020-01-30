import * as fromClients from '../clients/store/clients.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  clients: fromClients.ClientsReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  clients: fromClients.clientsReducer
};

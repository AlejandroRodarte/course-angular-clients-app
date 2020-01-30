import { Client } from 'src/app/shared/models/client';

import * as ClientActions from './clients.actions';

export interface ClientsReducerState {
  clients: Client[];
  selectedClient: Client;
  editMode: boolean;
}

const initialState: ClientsReducerState = {
  clients: [],
  selectedClient: null,
  editMode: false
};

export function clientsReducer(state = initialState, action: ClientActions.ClientActions) {

  switch (action.type) {

    case ClientActions.GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload
      };

    case ClientActions.GET_CLIENT_SUCCESS:
      return {
        ...state,
        selectedClient: action.payload,
        editMode: true
      };

    case ClientActions.SELECT_CLIENT:
      return {
        ...state,
        selectedClient: state.clients.find(client => client.id === action.payload),
        editMode: true
      };

    case ClientActions.CLEAR_CLIENT:
      return {
        ...state,
        selectedClient: null,
        editMode: false
      };

    case ClientActions.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };

    case ClientActions.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client: Client) => {

          if (client.id === action.payload.id) {
            return action.payload;
          }

          return client;

        }),
        selectedClient: null,
        editMode: false
      };

    default:
      return state;

  }

}

import { Client } from 'src/app/shared/models/client';

import * as ClientActions from './clients.actions';

export interface ClientsReducerState {
  clients: Client[];
  selectedClient: Client;
  editMode: boolean;
  primaryErrorMessage: string;
  secondaryErrorMessage: string;
}

const initialState: ClientsReducerState = {
  clients: [],
  selectedClient: null,
  editMode: false,
  primaryErrorMessage: null,
  secondaryErrorMessage: null
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

      case ClientActions.DELETE_CLIENT_SUCCESS:
        return {
          ...state,
          clients: state.clients.filter((client: Client) => client.id !== action.payload)
        };

      case ClientActions.CLIENT_REQUEST_FAIL:
        return {
          ...state,
          primaryErrorMessage: action.payload.primaryErrorMessage,
          secondaryErrorMessage: action.payload.secondaryErrorMessage
        };

      case ClientActions.CLEAR_ERROR_MESSAGES:
        return {
          ...state,
          primaryErrorMessage: null,
          secondaryErrorMessage: null
        };

    default:
      return state;

  }

}

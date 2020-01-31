import { Client } from 'src/app/shared/models/client';

import * as ClientActions from './clients.actions';
import { PaginationParams } from 'src/app/shared/payloads/pagination';

export interface ClientsReducerState {
  clients: Client[];
  selectedClient: Client;
  editMode: boolean;
  primaryErrorMessage: string;
  secondaryErrorMessage: string;
  formErrors: string[];
  paginationParams: PaginationParams;
}

const initialState: ClientsReducerState = {
  clients: [],
  selectedClient: null,
  editMode: false,
  primaryErrorMessage: null,
  secondaryErrorMessage: null,
  formErrors: [],
  paginationParams: {
    first: false,
    last: false,
    empty: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    numberOfElements: 0
  }
};

export function clientsReducer(state = initialState, action: ClientActions.ClientActions) {

  switch (action.type) {

    case ClientActions.GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload.clients,
        paginationParams: action.payload.paginationParams
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
        editMode: true,
        formErrors: []
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
        clients: [...state.clients, action.payload],
        formErrors: []
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
        editMode: false,
        formErrors: []
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

      case ClientActions.SET_FORM_ERROR_MESSAGES:
        return {
          ...state,
          formErrors: action.payload
        };

      case ClientActions.CLEAR_FORM_ERROR_MESSAGES:
        return {
          ...state,
          formErrors: []
        };

    default:
      return state;

  }

}

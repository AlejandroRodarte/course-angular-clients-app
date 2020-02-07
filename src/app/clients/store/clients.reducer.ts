import * as ClientActions from './clients.actions';
import { PaginationParams } from 'src/app/shared/payloads/pagination';
import { RawClientDto, ClientDto } from 'src/app/shared/models/client';

export interface ClientsReducerState {
  clients: RawClientDto[];
  selectedClient: ClientDto;
  editMode: boolean;
  primaryErrorMessage: string;
  secondaryErrorMessage: string;
  formErrors: string[];
  paginationParams: PaginationParams;
  downloadProgress: number;
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
  },
  downloadProgress: 0
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
        clients: state.clients.map((client: RawClientDto) => {

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
          clients: state.clients.filter((client: RawClientDto) => client.id !== action.payload)
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

      case ClientActions.UPLOAD_IMAGE_SUCCESS:

        return {
          ...state,
          clients: state.clients.map(client => {

            if (client.id === action.payload.id) {
              return action.payload;
            } else {
              return client;
            }

          }),
          editMode: false,
          selectedClient: {
            ...state.selectedClient,
            image: action.payload.image
          },
          downloadProgress: 0
        };

      case ClientActions.SET_UPLOAD_PROGRESS:
        return {
          ...state,
          downloadProgress: action.payload
        };

    default:
      return state;

  }

}

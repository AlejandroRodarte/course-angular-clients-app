import { Action } from '@ngrx/store';
import { PaginationParams } from 'src/app/shared/payloads/pagination';
import { RawClientDto, ClientDto } from 'src/app/shared/models/client';
import { CreateClientRequest, UpdateClientRequest } from 'src/app/shared/payloads/requests';

export const GET_CLIENTS_START = '[Clients] Get Clients Start';
export const GET_CLIENTS_SUCCESS = '[Clients] Get Clients Success';

export const GET_CLIENT_START = '[Clients] Get Client Start';
export const GET_CLIENT_SUCCESS = '[Clients] Get Client Success';

export const CLEAR_CLIENT = '[Clients] Clear Client';

export const ADD_CLIENT_START = '[Clients] Add Client Start';
export const ADD_CLIENT_SUCCESS = '[Clients] Add Client Success';

export const UPDATE_CLIENT_START = '[Clients] Update Client Start';
export const UPDATE_CLIENT_SUCCESS = '[Clients] Update Client Success';

export const DELETE_CLIENT_START = '[Clients] Delete Client Start';
export const DELETE_CLIENT_SUCCESS = '[Clients] Delete Client Success';

export const CLIENT_REQUEST_FAIL = '[Clients] Client Request Fail';
export const CLEAR_ERROR_MESSAGES = '[Clients] Clear Error Messages';

export const SET_FORM_ERROR_MESSAGES = '[Clients] Set Form Error Messages';
export const CLEAR_FORM_ERROR_MESSAGES = '[Clients] Clear Form Error Messages';

export const UPLOAD_IMAGE_START = '[Clients] Upload Image Start';
export const UPLOAD_IMAGE_SUCCESS = '[Clients] Upload Image Success';

export const SET_UPLOAD_PROGRESS = '[Clients] Set Upload Progress';

export type ClientActions =
GetClientsStart |
GetClientsSuccess |
GetClientStart |
GetClientSuccess |
ClearClient |
AddClientStart |
AddClientSuccess |
UpdateClientStart |
UpdateClientSuccess |
DeleteClientStart |
DeleteClientSuccess |
ClientRequestFail |
ClearErrorMessages |
SetFormErrorMessages |
ClearFormErrorMessages |
UploadImageStart |
UploadImageSuccess |
SetUploadProgress;

export class GetClientsStart implements Action {

  readonly type = GET_CLIENTS_START;

  constructor(
    public payload: number
  ) { }

}

export class GetClientsSuccess implements Action {

  readonly type = GET_CLIENTS_SUCCESS;

  constructor(
    public payload: {
      clients: RawClientDto[],
      paginationParams: PaginationParams
    }
  ) { }

}

export class GetClientStart implements Action {

  readonly type = GET_CLIENT_START;

  constructor(
    public payload: number
  ) { }

}

export class GetClientSuccess implements Action {

  readonly type = GET_CLIENT_SUCCESS;

  constructor(
    public payload: ClientDto
  ) { }

}

export class ClearClient implements Action {
  readonly type = CLEAR_CLIENT;
}

export class AddClientStart implements Action {

  readonly type = ADD_CLIENT_START;

  constructor(
    public payload: CreateClientRequest
  ) { }

}

export class AddClientSuccess implements Action {

  readonly type = ADD_CLIENT_SUCCESS;

  constructor(
    public payload: RawClientDto
  ) { }

}

export class UpdateClientStart implements Action {

  readonly type = UPDATE_CLIENT_START;

  constructor(
    public payload: UpdateClientRequest
  ) { }

}

export class UpdateClientSuccess implements Action {

  readonly type = UPDATE_CLIENT_SUCCESS;

  constructor(
    public payload: RawClientDto
  ) { }

}

export class DeleteClientStart implements Action {

  readonly type = DELETE_CLIENT_START;

  constructor(
    public payload: number
  ) { }

}

export class DeleteClientSuccess implements Action {

  readonly type = DELETE_CLIENT_SUCCESS;

  constructor(
    public payload: number
  ) { }

}

export class ClientRequestFail implements Action {

  readonly type = CLIENT_REQUEST_FAIL;

  constructor(
    public payload: {
      primaryErrorMessage: string,
      secondaryErrorMessage: string
    }
  ) { }

}

export class ClearErrorMessages implements Action {
  readonly type = CLEAR_ERROR_MESSAGES;
}

export class SetFormErrorMessages implements Action {

  readonly type = SET_FORM_ERROR_MESSAGES;

  constructor(
    public payload: string[]
  ) { }

}

export class ClearFormErrorMessages implements Action {
  readonly type = CLEAR_FORM_ERROR_MESSAGES;
}

export class UploadImageStart implements Action {

  readonly type = UPLOAD_IMAGE_START;

  constructor(
    public payload: {
      image: File,
      id: number
    }
  ) { }

}

export class UploadImageSuccess implements Action {

  readonly type = UPLOAD_IMAGE_SUCCESS;

  constructor(
    public payload: RawClientDto
  ) { }

}

export class SetUploadProgress implements Action {

  readonly type = SET_UPLOAD_PROGRESS;

  constructor(
    public payload: number
  ) { }

}
